export interface IAssetBase {
    assetAddress: string;
    assetOwnerAddress: string;
    assetName: string;
    assetSymbol: string;
    assetImage: string;
    assetIcon: string;
    assetDescription: string;
    assetTags: string[];
    assetContractType: 'LSP7' | 'LSP8';
    tokenId: string;
    tokenIdType: number;
    tokenImage: string;
    tokenDescription: string;
    tokenName: string;
    tokenAttributes: ITokenAttribute[];
}

export interface IAssetEnriched {
    tokenId: string;
    tokenName: string;
    tokenImage: string;
    assetName: string;
    rank: number;
    score: number;
    tokenAttributes: ITokenAttributeEnriched[];
    meta: Record<string, unknown>;
}

export interface ITokenAttributeEnriched {
    key: string;
    value: string;
    percentage: number;
    price?: number;
}

export interface ITokenAttribute {
    key: string;
    value: string;
    type: 'STRING' | 'NUMBER';
}

export interface TraitFrequency {
    [key: string]: {
        [value: string]: number;
    };
}

export interface RarityScore {
    id: string;
    score: number;
    rank?: number;
}

export type RarityEquation =
    | 'harmonicMean'
    | 'geometricMean'
    | 'weightedAverage'
    | 'informationContent'
    | 'sumOfScores'
    | 'lsp8Generic';

export interface IAttributeWeightMap {
    [attributeKey: string]: number;
}
