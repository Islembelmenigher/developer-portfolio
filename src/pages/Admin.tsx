import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchData();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    const [projectsRes, settingsRes] = await Promise.all([
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("site_settings").select("*"),
    ]);
    setProjects(projectsRes.data || []);
    const s: Record<string, string> = {};
    settingsRes.data?.forEach((item: any) => { s[item.key] = item.value; });
    setSettings(s);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const addProject = async () => {
    const { data, error } = await supabase.from("projects").insert({
      title: "New Project",
      description: "Project description",
      tech_stack: [],
      featured: true,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    setProjects([...projects, data]);
    toast.success("Project added!");
  };

  const updateProject = async (id: string, updates: any) => {
    const { error } = await supabase.from("projects").update(updates).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success("Project updated!");
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setProjects(projects.filter(p => p.id !== id));
    toast.success("Project deleted!");
  };

  const updateSetting = async (key: string, value: string) => {
    await supabase.from("site_settings").update({ value }).eq("key", key);
    setSettings({ ...settings, [key]: value });
    toast.success("Setting updated!");
  };

  const uploadProjectImage = async (projectId: string, file: File) => {
    setUploadingImages((prev) => ({ ...prev, [projectId]: true }));

    const fileExt = file.name.split(".").pop() || "jpg";
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
    const filePath = `projects/${projectId}/${Date.now()}-${safeName || `image.${fileExt}`}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setUploadingImages((prev) => ({ ...prev, [projectId]: false }));
      toast.error(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from("projects")
      .update({ image_url: imageUrl })
      .eq("id", projectId);

    setUploadingImages((prev) => ({ ...prev, [projectId]: false }));

    if (updateError) {
      toast.error(updateError.message);
      return;
    }

    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, image_url: imageUrl } : p)));
    toast.success("Image uploaded and saved!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><a href="/">View Site</a></Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Site Settings */}
        <section className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Site Settings</h2>
          <div className="grid gap-4">
            {["hero_title", "hero_description", "about_text", "contact_email", "github_url", "linkedin_url", "cv_url"].map(key => (
              <div key={key}>
                <label className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="bg-secondary/50"
                  />
                  <Button size="icon" variant="outline" onClick={() => updateSetting(key, settings[key] || "")}>
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <Button size="sm" onClick={addProject}><Plus className="w-4 h-4 mr-1" />Add Project</Button>
          </div>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <Input
                  value={project.title}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, title: e.target.value } : p))}
                  placeholder="Title"
                  className="bg-secondary/50"
                />
                <Textarea
                  value={project.description}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p))}
                  placeholder="Description"
                  className="bg-secondary/50"
                />
                <Input
                  value={project.tech_stack?.join(", ") || ""}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, tech_stack: e.target.value.split(",").map((t: string) => t.trim()) } : p))}
                  placeholder="Tech stack (comma separated)"
                  className="bg-secondary/50"
                />
                <Input
                  value={project.github_url || ""}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, github_url: e.target.value } : p))}
                  placeholder="GitHub URL"
                  className="bg-secondary/50"
                />
                <Input
                  value={project.live_url || ""}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, live_url: e.target.value } : p))}
                  placeholder="Live Demo URL"
                  className="bg-secondary/50"
                />
                <Input
                  value={project.image_url || ""}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, image_url: e.target.value } : p))}
                  placeholder="Project Image URL"
                  className="bg-secondary/50"
                />
                <div className="flex gap-2 items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void uploadProjectImage(project.id, file);
                      }
                      e.currentTarget.value = "";
                    }}
                    className="bg-secondary/50"
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {uploadingImages[project.id] ? "Uploading..." : "Select image to upload"}
                  </span>
                </div>
                <Input
                  type="number"
                  value={project.display_order ?? 0}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, display_order: Number(e.target.value) || 0 } : p))}
                  placeholder="Display Order (lower appears first)"
                  className="bg-secondary/50"
                />
                <div className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/30 px-3 py-2">
                  <label htmlFor={`featured-${project.id}`} className="text-sm">
                    Show in Featured Work section
                  </label>
                  <Switch
                    id={`featured-${project.id}`}
                    checked={Boolean(project.featured)}
                    onCheckedChange={(checked) => setProjects(projects.map(p => p.id === project.id ? { ...p, featured: checked } : p))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateProject(project.id, { title: project.title, description: project.description, tech_stack: project.tech_stack, github_url: project.github_url, live_url: project.live_url, image_url: project.image_url, display_order: project.display_order, featured: project.featured })}>
                    <Save className="w-4 h-4 mr-1" />Save
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
