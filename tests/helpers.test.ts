import { AssetBase, ITraitFrequency } from 'index';
import { addTraitCountAsTrait, calculatePercentages, calculateTraitFrequencies } from '../src/utils/helpers';

describe('addTraitCountAsTrait function', () => {
    it('should add TraitCount as an artificial trait to each NFT', () => {
        // Arrange
        const nfts: AssetBase[] = [
            {
                tokenAttributes: [{ key: 'STATUS', type: 'STRING', value: 'REVEALED' }],
                tokenId: '1',
                tokenImage: 'image1.png',
                tokenName: 'token1',
                assetName: 'asset1'
            },
            {
                tokenAttributes: [{ key: 'STATUS', type: 'STRING', value: 'UNREVEALED' }],
                tokenId: '2',
                tokenImage: 'image2.png',
                tokenName: 'token2',
                assetName: 'asset2'
            }
        ];

        // Act
        addTraitCountAsTrait(nfts);

        // Assert
        expect(nfts[0].tokenAttributes.find(ta => ta.key === 'TraitCount').value).toBe('1');
        expect(nfts[1].tokenAttributes.find(ta => ta.key === 'TraitCount').value).toBe('1');
    });

    it('should exclude traitCount for unrevealed tokens', () => {
        // Arrange
        const nfts: AssetBase[] = [
            {
                tokenAttributes: [
                    { key: 'STATUS', type: 'STRING', value: 'UNREVEALED' },
                    { key: 'Rarity', type: 'STRING', value: 'Rare' }
                ],
                tokenId: '1',
                tokenImage: 'image1.png',
                tokenName: 'token1',
                assetName: 'asset1'
            }
        ];

        // Act
        addTraitCountAsTrait(nfts);

        // Assert
        expect(nfts[0].tokenAttributes.find(ta => ta.key === 'TraitCount').value).toBe('1');
    });

    it('should include traitCount for revealed tokens with multiple attributes', () => {
        // Arrange
        const nfts: AssetBase[] = [
            {
                tokenAttributes: [
                    { key: 'STATUS', type: 'STRING', value: 'REVEALED' },
                    { key: 'Rarity', type: 'STRING', value: 'Rare' }
                ],
                tokenId: '2',
                tokenImage: 'image2.png',
                tokenName: 'token2',
                assetName: 'asset2'
            }
        ];

        // Act
        addTraitCountAsTrait(nfts);

        // Assert
        expect(nfts[0].tokenAttributes.find(ta => ta.key === 'TraitCount').value).toBe('2');
    });
});

describe('calculatePercentages function', () => {
    it('should correctly calculate percentages based on trait frequencies', () => {
        const traitFrequencies: ITraitFrequency = {
            color: {
                blue: 5,
                red: 10
            },
            size: {
                small: 7,
                large: 3
            }
        };

        const assetsTotal = 25;

        const expectedPercentages: ITraitFrequency = {
            color: {
                blue: 20,
                red: 40
            },
            size: {
                small: 28,
                large: 12
            }
        };

        const result = calculatePercentages(traitFrequencies, assetsTotal);

        expect(result).toStrictEqual(expectedPercentages);
    });
});

describe('calculateTraitFrequencies function', () => {
    // Initializing test data
    const nfts: AssetBase[] = [
        {
            tokenAttributes: [{ key: 'color', value: 'red', type: 'STRING' }],
            tokenId: '1',
            tokenImage: 'image1',
            tokenName: 'token1',
            assetName: 'asset1'
        },
        {
            tokenAttributes: [{ key: 'color', value: 'blue', type: 'STRING' }],
            tokenId: '2',
            tokenImage: 'image2',
            tokenName: 'token2',
            assetName: 'asset2'
        },
        {
            tokenAttributes: [{ key: 'color', value: 'red', type: 'STRING' }],
            tokenId: '3',
            tokenImage: 'image3',
            tokenName: 'token3',
            assetName: 'asset3'
        }
    ];

    it('provides the correct trait frequency for given NFTs', () => {
        const expectedFrequencies: ITraitFrequency = {
            color: { red: 2, blue: 1 }
        };
        expect(calculateTraitFrequencies(nfts)).toEqual(expectedFrequencies);
    });
});
