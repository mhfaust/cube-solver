import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Central route definitions used by navigation helpers and links.
 */
export const routes = {
    myCube: '/my-cube',
    gamePlays: '/leaderboard',
    gamePlay: (id: string) => `/leaderboard/${id}`,
    theme: '/theme'
}


/**
 * Provides memoized route navigation callbacks backed by Next.js router push.
 */
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

/**
 * Returns a matcher function that checks whether the current pathname starts with a root path.
 */
export const useIsCurrentRoot =  () => {
    const pathname = usePathname();

    return (root: string) => {
        return pathname.startsWith(root);
    }
}
