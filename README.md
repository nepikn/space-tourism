# Space Tourism

根據 Frontend Mentor 提供的 [Space tourism website challenge](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3) 所設計的網站

## 預期功能

- 瀏覽「依據裝置尺寸優化的網頁切版」
- 檢視「可互動元件的鼠標懸浮狀態」
- 瀏覽不同頁面並切換分頁以檢視不同資訊

## 展示

|             | 375px                                                                                                    | 768px                                                                                                    | 1440px                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Home        | ![home-375](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-375.jpg) | ![home-768](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-768.jpg) | ![home-1440](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-1440.jpg) |
| Destination | ![dest-375](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/dest-375.jpg) | ![dest-768](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/dest-768.jpg) | ![dest-1440](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/dest-1440.jpg) |
| Crew        | ![crew-375](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/crew-375.jpg) | ![crew-768](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/crew-768.jpg) | ![crew-1440](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/crew-1440.jpg) |
| Technology  | ![tech-375](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/tech-375.jpg) | ![tech-768](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/tech-768.jpg) | ![tech-1440](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/tech-1440.jpg) |

> [Live Demo](https://space-tourism-pch.vercel.app/)

## 主要技術

- NextJS v13
- TailwindCSS v3
- Figma

## 學習內容

### 以 `counter()` 作為有序清單的項目前綴

![home-1440-nav](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-1440-nav.png)

```html
<nav class="[counter-reset:count_-1]">
  <a
    class="[counter-increment:count_1]
            before:content-[counter(count,decimal-leading-zero)]"
    href="/"
    >home</a
  >
  <!-- ... -->
</nav>
```

> - `[counter-reset:count_-1]`: 重設 `count` 為 `-1`
> - `[counter-increment:count_1]`: 清單中每一項目都使 `count` 加上 `1`
> - `[counter(count,decimal-leading-zero)]`: 以 `decimal-leading-zero` 為樣式回傳 `count`

### 以 `useState` 展開／折疊 `<aside>`

| 展開                                                                                                                   | 折疊                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![home-375-expand](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-375-expand.jpg) | ![home-375-collapse](https://raw.githubusercontent.com/nepikn/space-tourism/main/public/screenshots/home-375-collapse.jpg) |

```typescript
// header.tsx
export default function Header() {
  const [expand, setExpand] = useState(false);
  const toggleAside = () => setExpand((e) => !e);

  return (
    <header className="...">
      // ...
      <div className="md:hidden">
        <button onClick={toggleAside}>// ...</button>
        <Aside expand={expand} toggleAside={toggleAside} />
      </div>
      // ...
    </header>
  );
}
```

```typescript
// aside.tsx
export default function Aside({ expand, toggleAside }) {
  // ...
  return (
    <div
      className={clsx(
        expand || "translate-x-full",
        "... flex h-screen w-full transition-transform",
      )}
    >
      <div onClick={toggleAside} className="grow" />
      <aside className="... w-[254px]">
        <div className="...">
          <button onClick={toggleAside} className="...">
            // ...
          </button>
        </div>
        <div onClick={handleNavClick} className="...">
          <MainNav variant="vertical" />
        </div>
      </aside>
    </div>
  );
}
```

> `expand` 預設為 `false`，故 `expand || "translate-x-full"` 預設為 `"translate-x-full"` 而折疊 `<aside>`。以 `toggleAside()` 使 `expand == true` 來展開 `<aside>`，並以 `"transition-transform"` 度過「展開／折疊」。

## 相關資源

- [MDN - Using CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters)
- [React - useState](https://react.dev/reference/react/useState)
