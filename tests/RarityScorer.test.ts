import { RarityScorer } from '../src';
import { AssetBase, AttributeWeightMap, RarityEquation } from 'index';

describe('RarityScorer class tests', () => {
    let rarityScorer: RarityScorer;
    const mockAssets: AssetBase[] = [
        {
            tokenAttributes: [
                { key: 'color', value: 'red', type: 'STRING' },
                { key: 'size', value: 'medium', type: 'STRING' }
            ],
            tokenId: '1',
            tokenImage: 'http://example.com/image1',
            tokenName: 'token1',
            assetName: 'asset1'
        },
        {
            tokenAttributes: [
                { key: 'color', value: 'blue', type: 'STRING' },
                { key: 'size', value: 'large', type: 'STRING' }
            ],
            tokenId: '2',
            tokenImage: 'http://example.com/image2',
            tokenName: 'token2',
            assetName: 'asset2'
        }
    ];
    const mockAttributeWeights: AttributeWeightMap = {
        color: 2,
        size: 1
    };
    const rarityEquations: RarityEquation[] = [
        'harmonicMean',
        'geometricMean',
        'weightedAverage',
        'informationContent',
        'sumOfScores',
        'lsp8Generic'
    ];

    beforeEach(() => {
        rarityScorer = new RarityScorer(true, 'harmonicMean', false, mockAttributeWeights);
    });

    it('should construct properly', () => {
        expect(rarityScorer).toBeInstanceOf(RarityScorer);
    });

    rarityEquations.forEach(equation => {
        it(`should calculate scores using ${equation}`, () => {
            rarityScorer.scoringMethod = equation;
            const { scores } = rarityScorer.determineRankings(mockAssets);
            expect(scores.length).toBe(mockAssets.length);
            scores.forEach(score => {
                expect(score).toHaveProperty('score');
                expect(typeof score.score).toBe('number');
                expect(score).toHaveProperty('rank');
                expect(typeof score.rank).toBe('number');
            });
        });
    });

    it('should throw an error with invalid scoring method', () => {
        const invalidScoringMethod = 'invalidMethod';
        expect(() => {
            new RarityScorer(
                true,
                invalidScoringMethod as RarityEquation,
                false,
                mockAttributeWeights
            ).determineRankings(mockAssets);
        }).toThrow('Invalid scoring method selected.');
    });

    it('should correctly normalize scores', () => {
        rarityScorer = new RarityScorer(true, 'harmonicMean', false, mockAttributeWeights);
        const { scores } = rarityScorer.determineRankings(mockAssets);
        const normalizedScores = scores.map(s => s.score);
        expect(Math.max(...normalizedScores)).toBeLessThanOrEqual(1);
    });

    it('should correctly assign ranks without ties', () => {
        rarityScorer.nonUniqueRanking = false;
        const { scores } = rarityScorer.determineRankings(mockAssets);
        const ranks = scores.map(s => s.rank);
        expect(new Set(ranks).size).toBe(mockAssets.length);
    });

    it('should allow ties in ranks when nonUniqueRanking is true', () => {
        rarityScorer.nonUniqueRanking = true;
        const { scores } = rarityScorer.determineRankings(mockAssets);
        expect(scores[0].rank).toBeGreaterThanOrEqual(1);
    });
});
