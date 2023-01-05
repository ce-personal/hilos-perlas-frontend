import IScore from "../interface/shared/IScore"

const calculateScore = (listScore?: IScore[]) => {
    if (!listScore) return 0;

    const sumatory = listScore.map((a: IScore) => a.value).reduce((a: number, b: number) => a + b, 0);
    return sumatory / listScore.length;
}

export {
    calculateScore
}