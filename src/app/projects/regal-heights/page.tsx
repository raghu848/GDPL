import { getProjectBySlug } from "@/lib/projectsData";
import ProjectDetailPage from "@/components/ui/ProjectDetailPage";
import { notFound } from "next/navigation";

export default function RegalHeightsPage() {
    const project = getProjectBySlug("regal-heights");
    if (!project) return notFound();
    return <ProjectDetailPage project={project} />;
}
