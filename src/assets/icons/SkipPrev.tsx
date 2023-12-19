import { SVGProps } from "react"
import { svgOptions } from "."
const SkipPrev = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgOptions.width}
        height={svgOptions.height}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke={svgOptions.stroke}
            strokeWidth={svgOptions.strokeWidth}
            d="M7.34 9.353c-1.787 1.154-1.787 4.14 0 5.294l10.79 6.967c1.736 1.122 3.87-.338 3.87-2.647V5.033c0-2.31-2.134-3.769-3.87-2.648L7.34 9.353Z"
        />
        <path
            stroke={svgOptions.stroke}
            strokeLinecap="round"
            strokeWidth={svgOptions.strokeWidth}
            d="M2 5v14"
        />
    </svg>
)
export default SkipPrev
