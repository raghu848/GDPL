import { getProjectBySlug } from "@/lib/projectsData";
import ProjectDetailPage from "@/components/ui/ProjectDetailPage";
import { notFound } from "next/navigation";

export default function RegalEmpirusPage() {
    const project = getProjectBySlug("regal-empirus");
    if (!project) return notFound();
    return <ProjectDetailPage project={project} />;
}
