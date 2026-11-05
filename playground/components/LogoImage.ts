import { Image, View } from "swerveui"
import { shadow } from "./Shadow"

export function LogoImage(src: string): View {
    return Image(src)
        .shadow(shadow)
        .frame({
            width: "30vh",
            height: "30vh",
        })
}