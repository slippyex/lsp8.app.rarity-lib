import { AssetBase, IEquationOptions } from '../src';
import { calculateRanking } from '../src';

const assets: AssetBase[] = [
    {
        tokenId: '1',
        tokenName: 'Warrior 1',
        tokenAttributes: [
            { key: 'Weapon', value: 'Axe', type: 'STRING' },
            { key: 'Armor', value: 'Cloth', type: 'STRING' }
        ],
        tokenImage: 'https://image.com/1',
        assetName: 'Excalibur'
    },
    {
        tokenId: '2',
        tokenName: 'Warrior 2',
        tokenAttributes: [
            { key: 'Weapon', value: 'Sword', type: 'STRING' },
            { key: 'Armor', value: 'Plate', type: 'STRING' }
        ],
        tokenImage: 'https://image.com/2',
        assetName: 'Aegis'
    },
    {
        tokenId: '3',
        tokenName: 'Warrior 3',
        tokenAttributes: [
            { key: 'Weapon', value: 'Wand', type: 'STRING' },
            { key: 'Armor', value: 'Cloth', type: 'STRING' }
        ],
        tokenImage: 'https://image.com/2',
        assetName: 'Aegis'
    },
    {
        tokenId: '4',
        tokenName: 'Warrior 4',
        tokenAttributes: [
            { key: 'Profession', value: 'Wizard', type: 'STRING' },
            { key: 'Weapon', value: 'Wand', type: 'STRING' },
            { key: 'Armor', value: 'Cloth', type: 'STRING' }
        ],
        tokenImage: 'https://image.com/2',
        assetName: 'Aegis'
    }
];

const options: IEquationOptions = {
    useTraitCount: true,
    useNormalization: true,
    algorithm: 'lsp8Generic',
    nonUniqueRanking: true
};

const ranking = calculateRanking(assets, options);
console.log(JSON.stringify(ranking, null, 2));
