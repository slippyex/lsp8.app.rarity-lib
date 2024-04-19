# 🌟 Unlock NFT Traits with LSP8 app Rarity Lib

Craving insights from your Non-Fungible Tokens (NFTs)? Dive deep into the characteristic traits of your collection and bring the hidden gems to the surface with our LSP8 app Rarity Lib. This powerful tool calculates rarity scores, updates a database with these scores, and assigns unique ranks for each NFT.

## Usage

```typescript
import { AssetBase, IEquationOptions, calculateRanking } from 'lsp8.app.rarity-lib';

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

```

will result into:
```json5
{
  "traitFrequencies": {
    "Weapon": {
      "Axe": 1,
      "Sword": 1,
      "Wand": 2
    },
    "Armor": {
      "Cloth": 3,
      "Plate": 1
    },
    "TraitCount": {
      "2": 3,
      "3": 1
    },
    "Profession": {
      "Wizard": 1
    }
  },
  "enrichedAssets": [
    {
      "tokenImage": "https://image.com/1",
      "tokenId": "1",
      "tokenName": "Warrior 1",
      "assetName": "Excalibur",
      "score": 6.666666666666666,
      "rank": 3,
      "meta": {},
      "tokenAttributes": [
        {
          "key": "Weapon",
          "value": "Axe",
          "percentage": 25
        },
        {
          "key": "Armor",
          "value": "Cloth",
          "percentage": 75
        },
        {
          "key": "TraitCount",
          "value": "2",
          "percentage": 75
        }
      ]
    },
    {
      "tokenImage": "https://image.com/2",
      "tokenId": "2",
      "tokenName": "Warrior 2",
      "assetName": "Aegis",
      "score": 9.333333333333334,
      "rank": 2,
      "meta": {},
      "tokenAttributes": [
        {
          "key": "Weapon",
          "value": "Sword",
          "percentage": 25
        },
        {
          "key": "Armor",
          "value": "Plate",
          "percentage": 25
        },
        {
          "key": "TraitCount",
          "value": "2",
          "percentage": 75
        }
      ]
    },
    {
      "tokenImage": "https://image.com/2",
      "tokenId": "3",
      "tokenName": "Warrior 3",
      "assetName": "Aegis",
      "score": 4.666666666666666,
      "rank": 4,
      "meta": {},
      "tokenAttributes": [
        {
          "key": "Weapon",
          "value": "Wand",
          "percentage": 50
        },
        {
          "key": "Armor",
          "value": "Cloth",
          "percentage": 75
        },
        {
          "key": "TraitCount",
          "value": "2",
          "percentage": 75
        }
      ]
    },
    {
      "tokenImage": "https://image.com/2",
      "tokenId": "4",
      "tokenName": "Warrior 4",
      "assetName": "Aegis",
      "score": 11.333333333333332,
      "rank": 1,
      "meta": {},
      "tokenAttributes": [
        {
          "key": "Profession",
          "value": "Wizard",
          "percentage": 25
        },
        {
          "key": "Weapon",
          "value": "Wand",
          "percentage": 50
        },
        {
          "key": "Armor",
          "value": "Cloth",
          "percentage": 75
        },
        {
          "key": "TraitCount",
          "value": "3",
          "percentage": 25
        }
      ]
    }
  ]
}
```

## Exemplifying NFT Characteristics with "TraitCount"
Adding a poignant novel trait called "TraitCount" to your NFTs is made simple. It mimics the number of traits each NFT possesses.

## Amplify Your Analysis with Trait Frequencies
Enhance your analysis by studying the frequency of each trait among the NFTs.

![Trait frequency equation](/docs/trait-frequencies.png)

## Rise in Ranks with Rarity Scores
Rarity scores pave the way for ranking your NFTs! This detailed ranking can be either unique or non-unique depending upon your preference.

*Unique Ranks*: Every NFT occupies a unique position in the rank hierarchy based solely on its score.

*Non-Unique Ranks*: NFTs with same scores are assigned same ranks, thereby allowing potential ties.

## Understand Trait Distribution with Trait Percentages
Get a better understanding of the diversity of your collection by examining the percentage representation of each trait.

![Trait frequency equation](/docs/trait-percentages.png)

## Meet the Universal Equation of LSP8 App!
The rarity score is the summation of the rarity of each trait of an NFT. The rarity of a trait reciprocates the trait's frequency.

![Rarity generic equation](/docs/lsp8-generic-equation.png)

# Discover a Spectrum of Support with OpenRarity
## Harmonic Mean
Don't let big differences in scores leave you confused. Harmonic Mean simplifies the scenario by dividing the number of scores by the sum of reciprocals of scores.

![OpenRarity harmonic mean equation](/docs/harmonic-mean.png)

## Geometric Mean
With Geometric Mean, the 'average' of scores is computed through the product of the numbers.

![OpenRarity geometric mean equation](/docs/geometric-mean.png)

## Weighted Average
Weighted Average uplifts scores of higher significance, hence adding precision to your analysis.

![OpenRarity weighted average equation](/docs/weighted-average.png)

## Information Content
Information Content projects the rarity in terms of information, transforming its basis into a logarithmic scale.

![OpenRarity harmonic mean equation](/docs/information-content.png)

## Sum of Scores
Simple is often most effective. The Sum of Scores method sums up all scores for an overall rating.

![OpenRarity sum of scores equation](/docs/sum-of-scores.png)

## Normalization and Collection Entropy
Normalization allows scores to be compared by bringing them within a certain range. 
Collection Entropy measures the diversity or unpredictability of traits within the collection.

![OpenRarity collection entropy](/docs/collection-entropy.png)

## ⚠️ A Word to the Wise
lsp8-app-rarity-lib aims to offer an open-source library for https://lsp8.app webapp that is easily accessible, user-friendly, and transparent. Feel free to leverage it for your calculations and rankings as well.

## 🤝 Come, Join Us!
Got suggestions for `lsp8-app-rarity-lib`? Found a bug? We would love to hear from you! Raise an issue or submit a pull request today.

## 📜 License
MIT
