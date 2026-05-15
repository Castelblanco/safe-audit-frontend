export type TAdapter<TDOM, TAPI> = {
    domToApi: (item: TDOM) => TAPI;
    partialDomToApi: (item: Partial<TDOM>) => Partial<TAPI>;
    apiToDom: (item: TAPI) => TDOM;
};
