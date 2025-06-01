import { useRouter } from "next/navigation";
import { useMemo } from "react";


export const useNavigation = () => {

    const { push } = useRouter();

    const goto = useMemo(() => {
        return {
            myCube: () => push('/'),
            gamePlays: () => push('/game-plays'),
            gamePlay: (id: string) => push(`/game-plays/${id}`)
        }

    }, [push]);

    return { goto }
}