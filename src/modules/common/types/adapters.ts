export type TAdapter<TDOM, TAPI> = {
    domToApi: (item: TDOM) => TAPI;
    apiToDom: (item: TAPI) => TDOM;
};
