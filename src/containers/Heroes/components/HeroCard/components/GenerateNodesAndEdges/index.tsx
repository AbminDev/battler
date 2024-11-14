import { SkillNode } from "../SkillNode";
import { SkillData } from "../transformTreeToSkillsData";

export const GenerateNodesAndEdges = (
  skills: SkillData[],
  selectedNodeId: string | null
) => {
  const nodes = skills.map((skill) => {
    return {
      id: skill.id,
      type: "customSkillNode",
      data: {
        image: skill.image,
        size: skill.size,
        alt: `Skill ${skill.id}`,
        selected: selectedNodeId ? skill.id === selectedNodeId : false,
        levels: skill.levels,
        claimed: skill.isClaimed,
        available: skill.isAvailable,
      },
      position: skill.position,
    };
  });

  const edges: any[] = [];
  skills.forEach((skill) => {
    if (skill.children) {
      skill.children.forEach((childId: any) => {
        const childSkill = skills.find((s) => s.id === childId);

        const edgeColor =
          !childSkill?.isClaimed && !childSkill?.isAvailable
            ? "#808080"
            : "#dc8603";

        edges.push({
          id: `e${skill.id}-${childId}`,
          source: skill.id,
          target: childId,
          type: "custom",
          animated: true,
          style: { stroke: edgeColor },
        });
      });
    }
  });

  return { nodes, edges };
};
