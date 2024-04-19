import { AssetBase, AttributeWeightMap, RarityEquation, IRarityScore, ITraitFrequency } from 'index';
import { calculatePercentages, calculateTraitFrequencies } from '../utils/helpers';

export class RarityScorer {
    normalized: boolean;
    scoringMethod: RarityEquation;
    nonUniqueRanking: boolean;
    attributeWeights: AttributeWeightMap;
    constructor(
        normalized = true,
        scoringMethod: RarityEquation,
        nonUniqueRanking = false,
        attributeWeights: AttributeWeightMap = {}
    ) {
        this.normalized = normalized;
        this.scoringMethod = scoringMethod;
        this.nonUniqueRanking = nonUniqueRanking;
        this.attributeWeights = attributeWeights;
    }

    public determineRankings(assets: AssetBase[]): {
        traitFrequencies: ITraitFrequency;
        traitPercentages: ITraitFrequency;
        scores: IRarityScore[];
    } {
        const frequencies = calculateTraitFrequencies(assets);
        const traitPercentages = calculatePercentages(frequencies, assets.length);

        let allUniqueAttributes: string[] = [];
        assets.forEach(asset => {
            const attrs = asset.tokenAttributes.map(attr => attr.key);
            allUniqueAttributes = [...new Set([...allUniqueAttributes, ...attrs])];
        });
        const weights = allUniqueAttributes.map(attr => this.attributeWeights[attr] || 1);

        const rarityScores: IRarityScore[] = assets.map(asset => ({
            id: asset.tokenId,
            score: this.calculateRarityScore(asset, frequencies, assets.length, weights)
        }));
        return {
            traitFrequencies: frequencies,
            traitPercentages: traitPercentages,
            scores: this.assignRanks(rarityScores)
        };
    }

    private calculateCollectionEntropy(frequencies: ITraitFrequency, totalAssets: number): number {
        return Object.values(frequencies).reduce((entropy, trait) => {
            return (
                entropy -
                Object.values(trait).reduce((innerSum, count) => {
                    const probability = count / totalAssets;
                    return innerSum + probability * Math.log2(probability);
                }, 0)
            );
        }, 0);
    }

    private calculateRarityScore(
        asset: AssetBase,
        frequencies: ITraitFrequency,
        totalAssets: number,
        weights: number[]
    ): number {
        const scores = asset.tokenAttributes.map(attr => frequencies[attr.key]?.[attr.value] || 0);
        const collectionEntropy = this.calculateCollectionEntropy(frequencies, totalAssets);

        switch (this.scoringMethod) {
            case 'harmonicMean':
                return this.harmonicMean(scores, weights);
            case 'geometricMean':
                return this.geometricMean(scores, weights);
            case 'weightedAverage':
                return this.weightedAverage(scores, weights);
            case 'informationContent':
                return this.informationContent(scores, collectionEntropy);
            case 'sumOfScores':
                return this.sumOfScores(scores, weights);
            case 'lsp8Generic':
                return this.lsp8Generic(asset, frequencies, totalAssets);
            default:
                throw new Error('Invalid scoring method selected.');
        }
    }

    private harmonicMean(scores: number[], weights: number[]): number {
        if (this.normalized) {
            const maxScore = Math.max(...scores);
            scores = scores.map(score => score / maxScore);
        }
        const weightedScoresSum = scores.reduce((acc, score, idx) => acc + weights[idx] / score, 0);
        const weightsSum = weights.reduce((acc, weight) => acc + weight, 0);
        return weightsSum / weightedScoresSum;
    }

    private geometricMean(scores: number[], weights: number[]): number {
        if (this.normalized) {
            const totalScores = scores.reduce((acc, score) => acc + score, 0);
            scores = scores.map(score => score / totalScores);
        }
        const weightedLogSum = scores.reduce((acc, score, idx) => acc + Math.log(score) * weights[idx], 0);
        const sumWeights = weights.reduce((acc, weight) => acc + weight, 0);
        return Math.exp(weightedLogSum / sumWeights);
    }

    private weightedAverage(scores: number[], weights: number[]): number {
        if (this.normalized) {
            const maxScore = Math.max(...scores);
            scores = scores.map(score => score / maxScore);
        }
        const sumWeightedScores = scores.reduce((acc, score, idx) => acc + score * weights[idx], 0);
        const sumWeights = weights.reduce((acc, weight) => acc + weight, 0);
        return sumWeights > 0 ? sumWeightedScores / sumWeights : 0;
    }

    private informationContent(scores: number[], collectionEntropy: number): number {
        if (this.normalized) {
            scores = scores.map(score => score / collectionEntropy);
        }
        const icScores = scores.map(score => -Math.log2(1 / score));
        const totalIcScore = icScores.reduce((acc, score) => acc + score, 0);
        return totalIcScore / collectionEntropy;
    }

    private sumOfScores(scores: number[], weights: number[]): number {
        if (this.normalized) {
            const totalScores = scores.reduce((acc, score) => acc + score, 0);
            scores = scores.map(score => score / totalScores);
        }
        return scores.reduce((acc, score, idx) => acc + score * weights[idx], 0);
    }

    private lsp8Generic(nft: AssetBase, frequencies: ITraitFrequency, totalNFTs: number): number {
        return nft.tokenAttributes.reduce((acc, { key, value }) => {
            const frequency = frequencies[key][value];
            const rarity = (1 / frequency) * totalNFTs; // Normalizing based on total NFTs
            return acc + rarity;
        }, 0);
    }

    public assignRanks(rarityScores: IRarityScore[]): IRarityScore[] {
        rarityScores.sort((a, b) => b.score - a.score);

        if (!this.nonUniqueRanking) {
            // Assign unique ranks
            rarityScores.forEach((item, index) => {
                item.rank = index + 1;
            });
        } else {
            // Assign ranks allowing for ties
            let currentRank = 1;
            for (let i = 0; i < rarityScores.length; i++) {
                if (i > 0 && rarityScores[i].score !== rarityScores[i - 1].score) {
                    currentRank = i + 1;
                }
                rarityScores[i].rank = currentRank;
            }
        }

        return rarityScores;
    }
}
