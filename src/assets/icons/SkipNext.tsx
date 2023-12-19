import { SVGProps } from "react"
import { svgOptions } from "."
const SkipNext = (props: SVGProps<SVGSVGElement>) => (
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
            d="M16.66 9.353c1.787 1.154 1.787 4.14 0 5.294L5.87 21.614C4.135 22.736 2 21.276 2 18.968V5.033c0-2.31 2.134-3.769 3.87-2.648l10.79 6.968Z"
        />
        <path
            stroke={svgOptions.stroke}
            strokeLinecap="round"
            strokeWidth={svgOptions.strokeWidth}
            d="M22 5v14"
        />
    </svg>
)
export default SkipNext
