import { getProjectBySlug } from "@/lib/projectsData";
import ProjectDetailPage from "@/components/ui/ProjectDetailPage";
import { notFound } from "next/navigation";

export default function RegalLuxuriaPage() {
    const project = getProjectBySlug("regal-luxuria");
    if (!project) return notFound();
    return <ProjectDetailPage project={project} />;
}
