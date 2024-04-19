interface IAssetBase {
    assetName: string;
    tokenId: string;
    tokenImage: string;
    tokenName: string;
    tokenAttributes: ITokenAttribute[];
}

export interface IAssetEnriched extends IAssetBase {
    rank: number;
    score: number;
    tokenAttributes: ITokenAttributeEnriched[];
    meta: Record<string, unknown>;
}

interface ITokenAttribute {
    key: string;
    value: string;
    type: 'STRING' | 'NUMBER';
}

export interface ITokenAttributeEnriched extends ITokenAttribute {
    percentage: number;
    price?: number;
}

export interface ITraitFrequency {
    [key: string]: {
        [value: string]: number;
    };
}

export interface IRarityScore {
    id: string;
    score: number;
    rank?: number;
}

export interface IEquationOptions {
    algorithm: RarityEquation;
    nonUniqueRanking: boolean;
    useTraitCount: boolean;
    useNormalization: boolean;
}

export type AttributeWeightMap = Record<string, number>;

export type RarityEquation =
    | 'harmonicMean'
    | 'geometricMean'
    | 'weightedAverage'
    | 'informationContent'
    | 'sumOfScores'
    | 'lsp8Generic';

export type AssetBase = Pick<IAssetBase, 'tokenAttributes' | 'tokenId' | 'tokenImage' | 'tokenName' | 'assetName'>;
