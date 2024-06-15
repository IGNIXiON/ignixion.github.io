# scripts
## 概要
- ./index.html
メインページ
<br>

- ./works/all.html
worksのallページ
<br>

- ./works/category.html
worksのcategoryページ
<br>

- ./data/works.json
業績が一定のフォーマットで書かれたjsonファイル。フォーマットについての詳しい説明は後ろの項を参照のこと。
<br>

- ./js/main.js
メインページの初期セットアップと他のページにも共通する処理を定める。よってどのページでもインポートする必要がある。共通する処理にはモーダルウィンドウの挙動の定義と「ページトップへ戻る」ボタンの定義がある。
<br>

- ./js/toppicks.js
トップページのスライド（#top-picks）を生成する。よって./index.htmlでのみインポートする必要がある。必要な業績データは./data/works.jsonから読み出す。
<br>

- ./js/works.js
worksページの項目を生成する。よってworksディレクトリ下部にある全てのhtml、今はall.htmlとcategory.htmlの2つ、でインポートする必要がある。必要な業績データは./data/works.jsonから読み出す。
<br>

- ./css/style.css
全体的なレイアウトを定めているスタイルシート。個別の細々したレイアウトは各ページのheaderで定める。

***

## ./data/works.json
### jsonの一般的な説明
jsonファイルは辞書型の構造を持ったデータの集まりであり、{}でまとめられた各データを[]でまとめる。

各データはキー（key）と各キーに紐づいた値（value）から成る複数の要素で記述され、`"key":value`をカンマで区切って{}の中に書いていく。ここでkeyは必ずダブルクオートで囲まなくてはならない。

例えばデータが1要素（key1, value1）を持つときは`{"key1":value1}`であり、2要素（key1, value1）と（key2, value2）を持つときは`{"key1":value1, "key2":value2}`である。

プログラムはこの構造（つまりは規則）を頼りに、データを検索し、key自体や、keyに紐づいたvalueを得る。

今回のようにvalueに文字列を使いたい時には文字列をダブルクオートで囲む。ただしダブルクオートの中でシングルクオート、ダブルクオート、バッククオートを使うと読み込みがバグるため、何かの表記に使いたい場合はhtmlやunicodeを使う。

例えば"HELLO CALLiNG"と書きたいときは`&quot;HELLO CALLiNG&quot;`と書く。

他にも特殊記号や特殊文字など読み込みをバグらせそうな文字はhtmlやunicodeを使う。

例えばŹOOĻと書きたいときは`&#x179;OO\&#x13B;`と書く。

### 今回のフォーマット説明
- pickup
trueかfalseによってトップページのtop-picksのスライドに並べるかを示す。

- caption
top-picksのスライドのサムネイル画像の下に書く短い紹介文。
<br>

- year
何年の仕事か。数値ではなく文字列として書く。
<br>

- category
なんのカテゴリーの仕事か。
<br>

- status
youtubeの動画の状況を次に定める３通りの文字列で示す。
"available": youtube動画が存在し、埋め込みが可能。
"restricted": youtube動画は存在するが、埋め込みが投稿者により制限されている。
"unavailable": youtube動画が存在しない。
<br>

- youtubeID
youtebeにおける動画のID
<br>

- reftxt
workページに書く業績のリファレンス情報。2つの文字列をカンマで区切り[]でまとめる。前には作品の主となるクレジット、後ろにはより詳しいクレジットを書くことを想定している。
<br>
例えば森拓人作曲の"HELLO CALLiNG"の主となるクレジットは`IDOLiSH7 (2022). HELLO CALLiNG [Song]. Lantis.`。より詳しいクレジットは`Lyrics: 真崎エリカ / Music: 森拓人 / Arrangement: 中土智博`といった具合である。
<br>

### Tips
captionとreftxtの内容はhtmlとして出力されるためタグによる修飾が有効である。
IGNIXiON所属のメンバーの部分にはhtmlタグである`<strong>`で強調すると良いと思う。
例えば
`Lyrics: 真崎エリカ / Music: 森拓人 / Arrangement: 中土智博`
を
`Lyrics: 真崎エリカ / <strong>Music: 森拓人</strong> / Arrangement: 中土智博`
とタグ修飾しておくことで、ページ上でMusic: 森拓人の部分が強調される。

Top picksやWorksページにおける並びはこのjsonファイルにおける並びに準ずる。
順番を入れ替えたい場合はこのファイルのデータを適切な順番に並び替えること。

<a id="jsonを分ける">
もしTop picksとWorksページで順番を変えたい場合（一番トップに紹介したい代表作が最新作とは限らない）は、
Top picks用とWorksページ用でファイルを２つ作り、それぞれをロードするように変更すれば良い。
役割が違うデータは、たとえ内容が一部共通していたとしても、素直に分けるのが得策である。
テキストデータを重複して持つことはコードが複雑になることに比べればなんてことはない。
</a>

### 具体例
1. 空のjsonファイル
```json
[

]
```
2. データが1つのjsonファイル
```json
[
  {
    "pickup": true,
    "caption": "IDOLiSH7 <br />&quot;HELLO CALLiNG&quot;<br />Music & Arr.: 森拓人",
    "year": "2022",
    "category": "music",
    "status": "available",
    "youtubeID": "kNgb67orxog",
    "reftxt": [
      "IDOLiSH7 (2022). HELLO CALLiNG [Song]. Lantis.",
      "<strong>Music: 森拓人</strong>"
    ]
  }
]
```
3. データが2つのjsonファイル
```json
[
  {
    "pickup": true,
    "caption": "IDOLiSH7 <br />&quot;HELLO CALLiNG&quot;<br />Music & Arr.: 森拓人",
    "year": "2022",
    "category": "music",
    "status": "available",
    "youtubeID": "kNgb67orxog",
    "reftxt": [
      "IDOLiSH7 (2022). HELLO CALLiNG [Song]. Lantis.",
      "<strong>Music: 森拓人</strong>"
    ]
  },
  {
    "pickup": false,
    "caption": "",
    "year": "2024",
    "category": "music",
    "status": "restricted",
    "youtubeID": "CTp57hSJJW0",
    "reftxt": [
      "杉本アラタ (2024). キミイロ [Song]. audio AVANT-GARDE.",
      "<strong>Music: 森拓人</strong>"
    ]
  }
]
```

***

## ./index.html
### 解説
Works部分のtop-picksのスライド部分は`./json/toppics.js`によって生成され、それ以外はベタ書きされている。

`./json/toppics.js`は"top-picks"idを持つコンテナを見つけ、その内側を動的に埋める。具体的には下記の部分である（本文, ll. 49-52）。

```html
<div id="top-picks" class="swiper-wrapper">
    <!--top pics-->
    <!--A scripit automatically populate it-->
</div>
```

### 注意
#### top picks
`./json/toppics.js`による動的な要素の生成は"top-picks"idを持つコンテナが`class="swiper-wrapper"`の時のみ意味を持つ。

またこのようなスライドを複数ページで表示したい場合には、`./json/toppics.js`を編集し"top-picks"以外のidにも要素を埋めるように編集する。htmlにおいてidの重複は許されない。

その具体的な編集例については`./json/toppics.js`の項で述べる。

#### 拡張子のないURL
GitHub Pagesでは拡張子なしURLによるページ遷移が可能である。拡張なしURLはアドレスバーをスッキリさせるので用いた。

***

## ./works/all.html
### 解説
各要素は`./json/works.js`によって生成されている。`./json/works.js`は業績データのyearと同一のidを持つコンテナを見つけて埋める。例えば2024の業績を一覧は本文（ll. 137-141）の

```html
<ul id="2024">
  <!-- Works list in 2024 -->
  <!-- A script automatically it -->
</ul>
```

を`./json/works.js`が要素で埋めることで出来上がる。

### 注意
`./json/works.js`による動的な要素の生成は"${year}"idを持つコンテナが`<ul>`タグもしくは`<ol>`タグである時のみ意味を持つ。特に意図がないなら`<ul>`を使っておく。

***

## ./works/category.html
`./works/all.html`のカテゴリ版。動きも注意もほぼ同じなので説明を省略する。適宜、先の読み替えること。

***

## ./js/main.js
### 解説
モーダルのセットアップにおいてstaticとdynamicを分けているのは、jQueryによって生成された要素にはイベントハンドラ（挙動）がページロード時には設置できないためである。よって下のようにjqueryを用いて、ページでトリガーとなるイベントが実際に発生した時に挙動を定めている（本文, ll. 66-71）。

```javascript
$(document).on("click", ".open", function () {
    if ($(this).data("content-type") == "dynamic"){
        const clickedButton = $(this);
        setupDynamicModal(clickedButton);
    }
});
```

### Tips
YT.playerによって動画プレイヤーを作成するのであるが、あまり深いところで作成するとその後の操作を受け付けなくなるっぽいので、手を加える時には注意すること。

実験では1階まではOKだった。
例えばこれ

```javascript:OKな例
$(document).ready(function() {
  lv1();
}

function lv1(){
  var player;
  player = new YT.Player('player');
}
```

は働くが、これ

```javascript:NGな例
$(document).ready(function() {
  lv1();
}

function lv1(){
  lv2();
}

function lv2(){
  var player;
  player = new YT.Player('player');
}
```

は働かない

***

## ./json/toppics.js
### 解説
コード自体に突飛な部分はないと思われる。
<a id="Top-picksも別の場所に追加したい">
ページの別部分でもスライドを表示したくなった場合に備えて、シンプルな例を示しておく。
</a>

### 編集例
例えば`top-picks2`というスライドをどこかで表示したくなり、`./data/works.json`の各データに`"pickup2": ture`という要素を追加したとする。
このときは本文, ll. 18-23

```javascript
function handleTopPicksSuccess(data) {
    const topPicks = $('#top-picks');
    data.filter(item => item.pickup).forEach(item => {
        topPicks.append(generateSwiperVideoCard(item));
    });
}
```

を次のように編集する。

```javascript
function handleTopPicksSuccess(data) {
    const topPicks = $('#top-picks');
    data.filter(item => item.pickup).forEach(item => {
        topPicks.append(generateSwiperVideoCard(item));
    });

    // 追加部分
    const topPicks2 = $('#top-picks2');
    data.filter(item => item.pickup).forEach(item => {
        topPicks2.append(generateSwiperVideoCard(item));
    });
}
```


## ./json/works.js
### 解説
worksページの一覧を`./data/works.js`を元に作成する。yearとcategoryにで振り分けるが、上から順に読んでいくため、year内やcategory内での順番は`./data/works.js`内での順番と等しい。

### Tips
今後チームメンバごとに業績を整理して表示する際にもこの処理を使いまわして実装することができる。

***

# server
## 設定
### 手順
次の参考文献を順番に読み頑張る。
1. サーバー建て
https://prog-8.com/docs/github-pages

2. ドメイン変更
https://zenn.dev/donchan922/articles/59c54fe659128294bb65

### 注意
Gitubのリポジトリ名は`<username>.github.io`とすることを**勧める**。リポジトリ名をそれ以外にした場合、外部ファイルの参照が素朴に思うものとは異なる挙動をする。

リポジトリ名を`<username>.github.io`としてGithub Pagesを公開する場合（User siteと呼ばれる）には、URLもルートもどちらも`https://<username>.github.io/`である。よってローカルで構築する場合と同様に参照するファイルのパスを書けば良い。一方、それ以外のリポジトリ名を用いてGithub Pages公開する場合（Project siteと呼ばれる）には、URLが`https://<username>.github.io/<repositoryname>`であるのに対し、ルートは`https://<username>.github.io/`である。よって素朴に相対パスを用いるとファイルが見つからずにエラーとなる。

このエラーはファイルの参照をルート相対パスを用いれば解消できるが、今回の状況ではページ公開は１アカウントに１つのみである。ルート相対パスによる参照の指定は普通ではないので、保守を考えると避けるべきである。

### 補足：３種類の異なるパスの記述
絶対パス、相対パス、ルート相対パスの違いを例示する。いまユーザー名を`spam`リポジトリ名を`ham`として、そこに次のようなディレクトリ構造があるとする。

```
https://spam.github.io/ham
├─ js
|  ...
|  └─ works.js
...
└─ data
   └─ works.json
```

この時`works.js`における`works.json`は３種類のパスの記述はそれぞれ以下のようになる

- 絶対パス
`https://spam.github.io/ham/data/works.json`
<br>

- 相対パス
`../data/works.json`
<br>

- リスト相対パス
`/ham/data/works.json`
<br>

### 拡張子なしのURL
GitHub Pagesでは、拡張子なしのURLを受け付けることができる。canonicalでURLの正規化を行っていれば、固定ページのリライトを意識する必要はない。<br>
ref.:<br>
https://qiita.com/h-kuwayama/items/6d429b3bd7f730e5b13b

***

## Q & A
- Q. 商用利用OKなの？
A. 会社のWebサイトをホストするのはOK。商品の販売や顧客情報（パスワードやクレカ情報）を直接交換すること等はNG。<br>
ref.:<br>
https://qiita.com/T-Oda-BTO/items/799c33e57f912a505b1b <br>
<br>

- Q. 問い合わせフォームは設置しても大丈夫？
A. 大丈夫。<br>
refs.:<br>
https://dev.to/charalambosioannou/create-a-static-webpage-with-a-contact-form-on-github-pages-3532 <br>
https://fabform.io/a/create-a-static-website-with-contact-form-on-github-pages/ <br>
https://fabform.io/a/create-a-static-website-with-contact-form-on-github-pages/ <br>
<br>

- Q. どういった機能を持つサイトはダメ？<br>
A. ユーザーページといったようなビジターごとにページのスクリプトが異なるようなページはダメ。問い合わせフォームはどのビジターに対しても同じスクリプトによるページが表示されている。<br>
<br>

- Q. サイズの上限は？
A. 1GB
<br>

- Q. ホームページの死活監視（障害が起きてないかを定期的に確認）できる？<br>
A. できる。ページ監視リポジトリを立て、そのリポジトリの動きをメールに送る。<br>
ref.:<br>
[https://qiita.com/yamagami2211/items/1017eca278aa110a79e0](https://ymmmtym.hateblo.jp/entry/2021/01/17/Upptime%E3%81%A7%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E6%AD%BB%E6%B4%BB%E7%9B%A3%E8%A6%96%E3%82%92%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B) <br>


## Tips
アイコンはOcticonsを用いています。
https://primer.style/foundations/icons/

## Hints
[Top picksとWorksページでデータの並びを変えたい、トップに見せるのが最新作ではない](#jsonを分ける)<br>
[Top picksを別の場所に追加したい](#Top-picksも別の場所に追加したい)
