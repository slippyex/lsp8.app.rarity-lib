import { IAssetBase, IAssetEnriched, RarityEquation, RarityScore, TraitFrequency } from 'index';
import { addTraitCountAsTrait, calculatePercentages, calculateTraitFrequencies } from '../utils/helpers';
import { RarityScorer } from './RarityScorer';

interface IEquationOptions {
    algorithm: RarityEquation;
    nonUniqueRanking: boolean;
    useTraitCount: boolean;
    useNormalization: boolean;
}
export function calculateRanking(
    assets: IAssetBase[],
    options: IEquationOptions
): { traitFrequencies: TraitFrequency; enrichedAssets: IAssetEnriched[] } {
    assets.forEach(fc => {
        if (!fc.tokenAttributes) {
            fc.tokenAttributes = [{ key: 'STATUS', value: 'UNREVEALED', type: 'STRING' }];
        }
    });

    if (options.useTraitCount) {
        addTraitCountAsTrait(assets);
    }

    const rarityScorer = new RarityScorer(options.useNormalization, options.algorithm, options.nonUniqueRanking);
    const rankedNFTs = rarityScorer.determineRankings(assets);

    return {
        traitFrequencies: rankedNFTs.traitFrequencies,
        enrichedAssets: assets.map(asset => {
            const matchingRarityScore = rankedNFTs.scores.find(r => r.id === asset.tokenId);
            return {
                tokenImage: asset.tokenImage,
                tokenId: asset.tokenId,
                tokenName: asset.tokenName,
                assetName: asset.assetName,
                score: matchingRarityScore?.score || 0,
                rank: matchingRarityScore?.rank || 0,
                meta: {},
                tokenAttributes: asset.tokenAttributes.map(ta => {
                    return {
                        key: ta.key,
                        value: ta.value,
                        percentage: rankedNFTs.traitPercentages[ta.key][ta.value]
                    };
                })
            };
        })
    };
}
