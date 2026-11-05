import { 
    View, 
    VStack,
    Text,
    Font,
    Button,
    State,
    HStack,
    Spacer,
} from "swerveui"

import SwerveUILogo from "./res/swerve.svg"
import ViteLogo from "./res/vite.svg"
import { LogoImage } from "./components/LogoImage"
import { shadow, simpleShadow } from "./components/Shadow"

export function App(): View {
    return VStack(() => {
        const [cnt, setCnt] = State(0)

        HStack(() => {
            LogoImage(SwerveUILogo)
            LogoImage(ViteLogo)
        })
        .spacing(50)

        Text("SwerveUI + Vite")
            .font(Font.extraLargeTitle2.pointSize(90).bold())
            .shadow(shadow)

        Text("A.K.A. YAOI Framework (Yet Another Object oriented Interface)")
            .font(Font.P.italic().monospaced())
            .shadow(simpleShadow)
            .padding({bottom: 28})
            .foreground("#c9c9c9")

        Text`Count: ${cnt}`
            .font(Font.title2)
            .shadow(simpleShadow)
            .padding({bottom: 16})

        Button("Tap me!")
            .onClick(() => {
                setCnt(cnt + 1)
                console.log(cnt())
            })
            .padding(16)
            .background("#10142b")
            .foreground("#ffffff")
            .cornerRadius(12)
            .shadow({
                color: "#7c83ff50",
                radius: 12,
                x: 0,
                y: 4,
                contentAware: false,
            })

        Spacer();

        Text("SwerveUI v0.0.3 · PRE-RELEASE ALPHA")
            .font(Font.P. pointSize(12).monospaced())
            .foreground("#858ba8")
            .padding({ top: 32 })

    })
    .foreground("#ffffff")
    .background("#262b46")
    .frame({
        height: "100%",
        width: "100%",
    })
    .alignment("center")
    .justify("center")
    .padding({top: 150})
}