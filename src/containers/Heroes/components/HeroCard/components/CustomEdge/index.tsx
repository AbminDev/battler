import React from 'react';
import { getStraightPath, getEdgeCenter, EdgeProps } from '@xyflow/react'; // Переконайтеся, що використовуєте правильний пакет

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  // Використовуємо getStraightPath замість getBezierPath
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  // Використовуємо стиль з пропсів, встановлюючи дефолтний колір, якщо не задано
  const edgeStyle = {
    stroke: style.stroke || '#dc8603',
    strokeWidth: 2,
    ...style,
  };

  return (
    <>
      <path
        id={id}
        style={edgeStyle}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text x={labelX} y={labelY} className="edge-label" textAnchor="middle" fill="#f6f6f6">
        {/* Якщо потрібні ярлики для ліній */}
      </text>
    </>
  );
};

export default CustomEdge;
