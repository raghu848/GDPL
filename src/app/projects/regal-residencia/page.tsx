import { getProjectBySlug } from "@/lib/projectsData";
import ProjectDetailPage from "@/components/ui/ProjectDetailPage";
import { notFound } from "next/navigation";

export default function RegalResidenciaPage() {
    const project = getProjectBySlug("regal-residencia");
    if (!project) return notFound();
    return <ProjectDetailPage project={project} />;
}
