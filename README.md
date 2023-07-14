# 專案名稱: 地下城冒險

## Setup

模組類別

1. 角色(Character)類別：
   定義基本角色的屬性（例如：名稱、生命值、攻擊力等）和方法（例如：攻擊、受傷等）。 可以進一步派生出不同類型的角色，如戰士、法師、盜賊等。
2. 回合(Round)類別：
   定義遊戲中的回合機制，管理角色的行動順序和回合流程。 可以使用狀態模式（State Pattern）來管理遊戲回合的不同狀態，如玩家行動、敵人行動、遊戲結束等。
3. 怪物(Monster)類別：
   定義基本怪物的屬性（例如：名稱、生命值、攻擊力等）和方法（例如：攻擊、受傷等）。 可以進一步派生出不同等級的怪物，如等級 1,等級 2,等級 3 等。
4. 受傷害(TakeAttack)類別：
   受傷害的血量計算
5. 動畫(Animation)類別：
   受到攻擊或是提升防禦的動畫效果,該物件主要是展現動畫

待開發模組類別 -
技能(Skill)類別：
定義角色可以使用的技能，包含技能名稱、消耗的資源、傷害效果等屬性。 使用策略模式（Strategy Pattern）可以讓技能的實現與角色類別解耦，方便擴展和修改技能系統。
遊戲引擎(Game Engine)類別：
負責遊戲的初始化、更新和渲染等功能。 可以使用單例模式（Singleton Pattern）確保只有一個遊戲引擎實例。
待擴增技能模組.道具模組
地圖(Map)類別：
定義遊戲地圖的屬性和方法，如地圖大小、獲取特定位置的角色等。 可以使用享元模式（Flyweight Pattern）來儲存地圖中的靜態數據，以節省記憶體。

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
