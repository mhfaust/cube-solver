import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

export const routes = {
    myCube: '/my-cube',
    gamePlays: '/leaderboard',
    gamePlay: (id: string) => `/leaderboard/${id}`,
    theme: '/theme'
}



export const useNavigation = () => {

    const { push } = useRouter();

    const goto = useMemo(() => {
        return {
            myCube: () => push(routes.myCube),
            gamePlays: () => push(routes.gamePlays),
            gamePlay: (id: string) => push(routes.gamePlay(id)),
            theme: () => push('theme')
        }

    }, [push]);

    return { goto }
}

export const useIsCurrentRoot =  () => {
    const pathname = usePathname();

    return (root: string) => {
        return pathname.startsWith(root);
    }
}
