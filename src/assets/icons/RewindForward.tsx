import { SVGProps } from "react"
import { svgOptions } from "."
const RewindForward = (props: SVGProps<SVGSVGElement>) => (
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
            d="m11 8.768-6.097-4.46C3.601 3.411 2 4.58 2 6.426v11.148c0 1.847 1.6 3.015 2.903 2.118L11 15.232"
        />
        <path
            stroke={svgOptions.stroke}
            strokeWidth={svgOptions.strokeWidth}
            d="M21.079 10.147c1.228.807 1.228 2.899 0 3.706L13.66 18.73c-1.194.785-2.661-.237-2.661-1.853V7.123c0-1.616 1.467-2.638 2.661-1.853l7.418 4.877Z"
        />
    </svg>
)
export default RewindForward