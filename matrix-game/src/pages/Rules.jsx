import { useState } from 'react';
import { useGameState } from '../app/GameStateProvider.jsx';
import GameButton from '../components/GameButton.jsx';
import RuleMatrixExample from '../components/RuleMatrixExample.jsx';
import RulesLanguageTabs from '../components/RulesLanguageTabs.jsx';

const rulesContent = {
  english: {
    backToStart: 'Back to Start',
    heading: 'Rules',
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'paragraph',
            text: 'This is a guessing game where one player gives a clue and the other players try to guess a secret number.',
          },
          {
            type: 'paragraph',
            text: 'Each round has:',
          },
          {
            type: 'list',
            items: [
              'A category',
              'A top scale',
              'A side scale',
              'A secret number',
              'One player holding the iPad',
              'The other players guessing on their phones',
            ],
          },
          {
            type: 'paragraph',
            text: 'The aim is to choose an example from the category that helps the other players find the secret number.',
          },
        ],
      },
      {
        title: 'Setup',
        blocks: [
          {
            type: 'numbered',
            items: [
              'Every player starts the game on their own phone.',
              'Each player chooses the language they want to play in.',
              'Every player must choose the same difficulty that was selected on the iPad.',
              'The iPad controls the main game.',
              'The iPad chooses who takes the first turn.',
              'The player whose turn it is should take the iPad.',
            ],
          },
        ],
      },
      {
        title: 'Taking a Turn',
        blocks: [
          {
            type: 'subtitle',
            text: 'If you have the iPad',
          },
          {
            type: 'numbered',
            items: [
              'On your phone, press the button for playing with the iPad.',
              'On the iPad, start the turn.',
              'The iPad will generate the round.',
              'Hide the iPad screen from the other players.',
              'Hold the Show Secret Number button.',
              'Look at the secret number without showing anyone else.',
              'Choose something from the category that fits the secret number position on the matrix.',
              'Say your answer out loud.',
              'Wait for every other player to lock in their guess on their phone.',
              'Reveal the secret number.',
              'Ask how many players guessed the exact secret number.',
              'Enter that number on your phone so your score can be calculated.',
            ],
          },
          {
            type: 'subtitle',
            text: 'If you are playing on your phone',
          },
          {
            type: 'numbered',
            items: [
              'Press Start Turn.',
              'Look at the category and scales for the round.',
              'Listen to the answer given by the player with the iPad.',
              'Guess the secret number on your phone.',
              'Lock in your guess.',
              'Do not reveal your guess yet.',
              'When the iPad player reveals the secret number, enter the correct secret number on your phone.',
              'Your score for the round will be calculated.',
              'If you guessed the exact secret number, tell the player with the iPad.',
            ],
          },
        ],
      },
      {
        title: 'Round Example',
        blocks: [
          {
            type: 'paragraph',
            text: 'Example round:',
          },
          {
            type: 'list',
            items: [
              'Category: Animals',
              'Top scale: Small to Big',
              'Side scale: Scary to Cute',
              'Difficulty: Easy',
              'Secret number: 3',
            ],
          },
          {
            type: 'paragraph',
            text: 'In this example, the secret number is 3. On the matrix, 3 is at the top-right, which means the answer should be big and scary.',
          },
          {
            type: 'diagram',
          },
          {
            type: 'paragraph',
            text: 'A good answer could be something like: Tiger. This is because a tiger is a big and scary animal.',
          },
        ],
      },
      {
        title: 'Scoring',
        blocks: [
          {
            type: 'subtitle',
            text: 'If you have the iPad',
          },
          {
            type: 'list',
            items: [
              'You get 3 points for every other player who guesses the exact secret number.',
            ],
          },
          {
            type: 'subtitle',
            text: 'If you are playing on your phone',
          },
          {
            type: 'list',
            items: [
              'You get 1 point if your guess is in the correct row.',
              'You get 1 point if your guess is in the correct column.',
              'You get 3 points if you guess the exact secret number.',
            ],
          },
        ],
      },
      {
        title: 'Ending the Game',
        blocks: [
          {
            type: 'paragraph',
            text: 'When everyone wants to finish, every player presses the End Game button.',
          },
          {
            type: 'paragraph',
            text: 'The scores are added up. The player with the highest score wins.',
          },
        ],
      },
    ],
  },
  japanese: {
    backToStart: 'スタートに戻る',
    heading: 'ルール',
    sections: [
      {
        title: '概要',
        blocks: [
          {
            type: 'paragraph',
            text: 'このゲームは、1人がヒントを出して、他のプレイヤーが秘密の数字を当てるゲームです。',
          },
          {
            type: 'paragraph',
            text: '各ラウンドには、次のものがあります。',
          },
          {
            type: 'list',
            items: [
              'カテゴリー',
              '上のスケール',
              '横のスケール',
              '秘密の数字',
              'iPadを持つプレイヤー',
              'スマホで答える他のプレイヤー',
            ],
          },
          {
            type: 'paragraph',
            text: 'カテゴリーに合うものを言って、他のプレイヤーに秘密の数字を伝えることを目指します。',
          },
        ],
      },
      {
        title: '準備',
        blocks: [
          {
            type: 'numbered',
            items: [
              '全員が自分のスマホでゲームを始めます。',
              '各プレイヤーは、自分が使いたい言語を選びます。',
              '全員が、iPadで選ばれた難易度と同じ難易度を選びます。',
              'iPadはゲーム全体を進めるために使います。',
              'iPadが最初のプレイヤーを選びます。',
              '選ばれたプレイヤーがiPadを持ちます。',
            ],
          },
        ],
      },
      {
        title: 'ターンの進め方',
        blocks: [
          {
            type: 'subtitle',
            text: 'iPadを持っている場合',
          },
          {
            type: 'numbered',
            items: [
              '自分のスマホで、iPadを持っている人用のボタンを押します。',
              'iPadでもターンを開始します。',
              'iPadに今回のラウンドが表示されます。',
              '他のプレイヤーにiPadの画面を見せないようにします。',
              'Show Secret Numberボタンを長押しします。',
              '秘密の数字を確認します。他の人には見せません。',
              'カテゴリーの中から、秘密の数字の位置に合うものを選びます。',
              '選んだ答えを声に出して言います。',
              '他のプレイヤー全員がスマホで答えをロックするまで待ちます。',
              '秘密の数字を発表します。',
              '何人が秘密の数字をぴったり当てたか確認します。',
              'その人数を自分のスマホに入力して、自分のスコアを計算します。',
            ],
          },
          {
            type: 'subtitle',
            text: 'スマホでプレイしている場合',
          },
          {
            type: 'numbered',
            items: [
              'Start Turnボタンを押します。',
              '今回のカテゴリーとスケールを確認します。',
              'iPadを持っているプレイヤーの答えを聞きます。',
              '自分のスマホで秘密の数字を予想します。',
              '答えをロックします。',
              'まだ答えは見せません。',
              'iPadのプレイヤーが秘密の数字を発表したら、正しい秘密の数字を自分のスマホに入力します。',
              'そのラウンドのスコアが計算されます。',
              '秘密の数字をぴったり当てた場合は、iPadを持っているプレイヤーに伝えます。',
            ],
          },
        ],
      },
      {
        title: 'ラウンド例',
        blocks: [
          {
            type: 'paragraph',
            text: 'ラウンド例:',
          },
          {
            type: 'list',
            items: [
              'カテゴリー: 動物',
              '上のスケール: 小さい から 大きい',
              '横のスケール: こわい から かわいい',
              '難易度: かんたん',
              '秘密の数字: 3',
            ],
          },
          {
            type: 'paragraph',
            text: 'この例では、秘密の数字は3です。マトリックスでは、3は右上にあります。つまり、答えは大きくてこわいものになります。',
          },
          {
            type: 'diagram',
          },
          {
            type: 'paragraph',
            text: 'よい答えの例は、トラです。トラは大きくてこわい動物なので、この位置に合います。',
          },
        ],
      },
      {
        title: 'スコア',
        blocks: [
          {
            type: 'subtitle',
            text: 'iPadを持っている場合',
          },
          {
            type: 'list',
            items: [
              '他のプレイヤーが秘密の数字をぴったり当てるたびに、3点をもらいます。',
            ],
          },
          {
            type: 'subtitle',
            text: 'スマホでプレイしている場合',
          },
          {
            type: 'list',
            items: [
              '自分の予想が正しい行にある場合、1点をもらいます。',
              '自分の予想が正しい列にある場合、1点をもらいます。',
              '秘密の数字をぴったり当てた場合、3点をもらいます。',
            ],
          },
        ],
      },
      {
        title: 'ゲーム終了',
        blocks: [
          {
            type: 'paragraph',
            text: 'みんながゲームを終わりたいと思ったら、全員がEnd Gameボタンを押します。',
          },
          {
            type: 'paragraph',
            text: 'スコアが合計されます。一番スコアが高いプレイヤーが勝ちです。',
          },
        ],
      },
    ],
  },
};

function renderBlock(block, language) {
  if (block.type === 'list') {
    return (
      <ul className="rules-page__list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'numbered') {
    return (
      <ol className="rules-page__list rules-page__list--numbered">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  if (block.type === 'subtitle') {
    return <h4 className="rules-page__subtitle">{block.text}</h4>;
  }

  if (block.type === 'diagram') {
    return <RuleMatrixExample language={language} />;
  }

  return <p>{block.text}</p>;
}

function Rules() {
  const { selectedLanguage } = useGameState();
  const initialLanguage = selectedLanguage === 'ja' ? 'japanese' : 'english';
  const [selectedRulesLanguage, setSelectedRulesLanguage] =
    useState(initialLanguage);
  const currentContent = rulesContent[selectedRulesLanguage];

  return (
    <section className="rules-page">
      <div className="page-copy rules-page__header">
        <h2>{currentContent.heading}</h2>
      </div>

      <RulesLanguageTabs
        onChange={setSelectedRulesLanguage}
        selectedLanguage={selectedRulesLanguage}
      />

      <div className="rules-page__content">
        {currentContent.sections.map((section) => (
          <section className="rules-page__section" key={section.title}>
            <h3>{section.title}</h3>
            {section.blocks.map((block, index) => (
              <div className="rules-page__block" key={`${section.title}-${index}`}>
                {renderBlock(block, selectedRulesLanguage)}
              </div>
            ))}
          </section>
        ))}
      </div>

      <div className="choice-list rules-page__actions">
        <GameButton to="/">{currentContent.backToStart}</GameButton>
      </div>
    </section>
  );
}

export default Rules;
