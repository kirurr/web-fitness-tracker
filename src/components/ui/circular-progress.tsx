"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  className?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  color = "text-blue-500",
  backgroundColor = "text-gray-200",
  className,
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className={cn("transition-all duration-300 ease-in-out", backgroundColor)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn("transition-all duration-300 ease-in-out", color)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute text-2xl font-semibold">{Math.round(progress)}%</div>
    </div>
  )
}


