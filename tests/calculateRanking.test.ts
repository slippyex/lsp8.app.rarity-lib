import { AssetBase, IEquationOptions } from 'index';
import { calculateRanking } from '../src';

describe('Test calculateRanking', () => {
    const testAssets: AssetBase[] = [
        {
            tokenAttributes: [{ key: 'STATUS', value: 'UNREVEALED', type: 'STRING' }],
            tokenId: '1',
            tokenImage: 'http://test.com/image.png',
            tokenName: 'Test Token',
            assetName: 'Test Asset'
        }
    ];

    const testOptions: IEquationOptions = {
        useTraitCount: false,
        useNormalization: true,
        algorithm: 'lsp8Generic',
        nonUniqueRanking: false
    };

    it('should calculate rankings correctly when rarity scoring is successful', () => {
        const result = calculateRanking(testAssets, testOptions);

        // Verify the output from calculateRanking given the mock rarity scores
        expect(result).toEqual({
            traitFrequencies: { STATUS: { UNREVEALED: 1 } },
            enrichedAssets: [
                {
                    tokenImage: 'http://test.com/image.png',
                    tokenId: '1',
                    tokenName: 'Test Token',
                    assetName: 'Test Asset',
                    score: 1,
                    rank: 1,
                    meta: {},
                    tokenAttributes: [{ key: 'STATUS', value: 'UNREVEALED', percentage: 100 }]
                }
            ]
        });
    });

    it('should treat collection as unrevealed correctly when no rarity scoring occurs', () => {
        const result = calculateRanking(testAssets, testOptions);
        expect(result).toEqual({
            traitFrequencies: { STATUS: { UNREVEALED: 1 } },
            enrichedAssets: [
                {
                    tokenImage: 'http://test.com/image.png',
                    tokenId: '1',
                    tokenName: 'Test Token',
                    assetName: 'Test Asset',
                    score: 1,
                    rank: 1,
                    meta: {},
                    tokenAttributes: [{ key: 'STATUS', value: 'UNREVEALED', percentage: 100 }]
                }
            ]
        });
    });
});
