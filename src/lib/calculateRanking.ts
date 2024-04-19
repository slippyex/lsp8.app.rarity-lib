import { AssetBase, IAssetEnriched, ITraitFrequency, IEquationOptions } from 'index';
import { addTraitCountAsTrait } from '../utils/helpers';
import { RarityScorer } from './RarityScorer';

export function calculateRanking(
    assets: AssetBase[],
    options: IEquationOptions
): { traitFrequencies: ITraitFrequency; enrichedAssets: IAssetEnriched[] } {
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
        }) as IAssetEnriched[]
    };
}
