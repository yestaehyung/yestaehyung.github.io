# Pretext Paper Blog Design

**Date:** 2026-03-30

## Goal

현재 논문 블로그를 "정리된 리뷰 목록"에서 한 단계 발전시켜, 글을 읽는 리듬이 살아 있는 연구 블로그로 개선한다.  
핵심은 `pretext`를 이용해 긴 제목과 핵심 문장의 줄 배치를 더 의도적으로 제어하고, 전체 사이트 기본 sans 글꼴을 `SUIT`로 통일하는 것이다.

## Why This Direction

현재 블로그는 구조가 이미 좋다.

- 논문별 상세 페이지가 있다.
- `Background`, `Motivation`, `Methodology`, `Results` 같은 섹션 구조가 분명하다.
- 실제 포스트 제목이 길고, 목록/상세 양쪽에서 줄바꿈 품질의 영향이 크다.

그래서 이번 작업은 블로그 전체를 갈아엎기보다, 기존 구조를 유지한 채 읽는 체감과 시각적 완성도를 높이는 방향으로 잡는다.

## Final Product Decisions

이번 작업에서 확정한 결정은 다음과 같다.

- 우선순위는 `B`: 논문 상세 페이지의 읽는 리듬 개선
- 보조 범위로 `C` 일부 포함: 블로그 목록 카드의 긴 제목 줄 균형 개선
- 사이트 기본 sans 글꼴은 전역 `SUIT`로 통일
- `OpenClawMissionControl`의 레트로/모노 폰트는 유지
- 논문 데이터 구조(`public/blog/posts.json`)는 바꾸지 않음
- markdown 본문 원문은 유지하고, 표현 레이어만 추가

## Scope

### 1. Blog Detail Experience

`/blog/:postId` 상세 페이지를 이번 작업의 중심으로 삼는다.

사용자가 실제로 보게 될 변화:

- 상단 제목이 지금보다 더 균형 있게 줄바꿈된다.
- 제목 아래에 읽기 진입을 돕는 `lead summary` 영역이 생긴다.
- 섹션 사이사이에 `pull quote` 또는 `section spotlight` 스타일의 리듬 블록이 들어간다.
- 기존 `Contents` 사이드바와 본문 흐름은 유지한다.
- 섹션 제목과 번호의 위계가 더 또렷해진다.

즉, 기존 구조를 버리지 않고 "논문 리뷰다운 몰입감"을 올린다.

### 2. Blog List Experience

`/blog` 목록 페이지는 전면 재디자인하지 않는다.

이번 범위에서 목록은 다음만 개선한다.

- 긴 제목 카드의 줄바꿈 균형 조정
- 카드 내부 텍스트 밀도 및 제목-메타 간격 정리
- 필요 시 `PaperGraph` 텍스트 폰트 통일

목록은 "들어오는 첫인상"만 다듬고, 상세 페이지 개선이 중심이라는 점을 유지한다.

### 3. Global Typography

사이트 전체 기본 sans를 `SUIT`로 바꾼다.

적용 원칙:

- `body`와 일반 UI 텍스트는 `SUIT`
- 블로그, publications, research sections의 `Google Sans` override는 정리
- code/monospace 계열은 기존 monospace 유지
- `OpenClawMissionControl`의 픽셀/레트로 폰트는 유지

## Non-Goals

이번 작업에서 하지 않는 것:

- 블로그 데이터 포맷 재설계
- CMS 도입
- markdown 문법 확장
- 블로그 전체를 잡지형 레이아웃으로 전면 개편
- 논문 카드에 복잡한 애니메이션 추가
- OpenClaw 페이지의 디자인 언어 변경

## UX Design

### Detail Page

상세 페이지는 다음 흐름으로 읽히게 만든다.

1. 상단에서 논문 제목과 핵심 맥락을 빠르게 파악한다.
2. `lead summary`로 왜 읽어야 하는지 한 번 더 요약해서 잡아준다.
3. 본문은 기존 섹션 구조를 따라 내려가되, 섹션 사이에 시각적 호흡을 넣는다.
4. 사용자는 논문을 "끝까지 읽는 긴 벽문장"이 아니라 "구조화된 리뷰"로 체감한다.

### Rhythm Blocks

리듬 블록은 본문을 대체하지 않고, 본문을 읽기 쉽게 돕는 역할만 한다.

후보 블록:

- `Lead Summary`: 포스트 전체를 한두 문장으로 요약
- `Pull Quote`: 글 안에서 가장 강한 문장 한 줄 강조
- `Spotlight`: 해당 논문의 핵심 키워드/태그/메시지 요약

규칙:

- 모든 섹션마다 블록을 넣지 않는다.
- 화면이 과밀해지지 않게 2~4개 정도만 사용한다.
- 원문 markdown을 자동 변형하지 않고, 정해진 규칙으로 선택된 위치에만 배치한다.

### List Page

목록은 지금처럼 정보 밀도가 높은 카드 구조를 유지한다.
대신 긴 제목이 제각각 흐트러져 보이는 문제를 줄인다.

사용자가 느끼게 될 변화:

- 카드들이 더 정돈돼 보인다.
- 긴 영어 제목이 덜 어색하게 보인다.
- 목록을 훑을 때 시선 피로가 줄어든다.

## Technical Design

### Data Strategy

`public/blog/posts.json`는 그대로 사용한다.

새로 만드는 표현 정보는 런타임에서 계산한다.

예:

- 제목의 균형 줄바꿈
- 특정 섹션용 강조 문장 선택
- 태그/venue/date 재배치

즉, 콘텐츠 원본을 건드리지 않고 UI 계층에서만 처리한다.

### Pretext Usage

`pretext`는 다음 용도로 제한해서 사용한다.

- 상세 페이지의 긴 논문 제목 줄 배치
- 목록 카드의 긴 제목 줄 배치
- 필요 시 강조 문장 또는 summary 블록의 균형 줄 배치

이번 작업에서는 `pretext`를 "본문 전체의 사용자 정의 텍스트 엔진"으로 과도하게 확대하지 않는다.  
핵심은 **긴 텍스트가 더 의도적으로 보이게 만드는 것**이다.

### Component Boundaries

구현은 기존 [`src/components/Blog.js`](/Users/taehyung/develop/personal/personal_webpage/src/components/Blog.js)를 중심으로 하되, 시각 로직은 분리한다.

예상 경계:

- `PretextBalancedText`: 긴 제목 줄 배치 전용 컴포넌트
- `BlogPostHero`: 상세 상단 구성
- `BlogRhythmSection`: 본문 중간의 리듬 블록 포함 섹션 래퍼
- `usePretextLayout`: width 변화에 따라 줄 배치 계산

중요한 원칙:

- markdown 렌더러는 최대한 그대로 유지
- 섹션 데이터 구조도 유지
- 새 표현 로직만 얇게 추가

## Styling Design

### Typography

- 전역 기본 sans: `SUIT`
- 블로그 제목/본문/메타 모두 `SUIT` 기준으로 재정렬
- 필요하면 강조용 display 느낌은 weight/spacing으로 해결하고 별도 장식 폰트는 추가하지 않음

### Visual Tone

블로그는 지나치게 실험적인 잡지 디자인보다, "연구 노트와 에디토리얼의 중간" 톤으로 맞춘다.

키워드:

- clean
- editorial
- warm-neutral
- readable
- structured

### Responsive Behavior

모바일에서는 다음 원칙을 따른다.

- 상세 페이지는 한 컬럼 중심
- TOC는 상단 또는 축약형으로 자연스럽게 정리
- 리듬 블록이 본문 가독성을 방해하지 않게 크기 축소
- `pretext` 레이아웃은 폭 변화에 맞춰 재계산

## Error Handling / Fallbacks

- `pretext` 레이아웃 계산이 실패하면 일반 텍스트 렌더링으로 fallback
- 매우 좁은 화면에서는 균형 줄바꿈보다 단순 가독성 우선
- 요약/강조 블록이 어색한 포스트는 최소 구성만 사용

즉, 화려함보다 안정성을 우선한다.

## Verification Strategy

구현 후 반드시 확인할 것:

- 전역 `SUIT` 적용 후 다른 섹션 레이아웃이 크게 깨지지 않는지
- 블로그 목록에서 긴 제목 카드 높이와 간격이 안정적인지
- 상세 페이지에서 `lead summary`/`pull quote`가 과하지 않은지
- 모바일에서 TOC와 본문 흐름이 자연스러운지
- `PaperGraph` 캔버스 라벨 폰트가 시각적으로 어색하지 않은지

## Implementation Order

1. `SUIT` 전역 폰트 로딩과 기본 폰트 정리
2. 블로그 목록 카드 제목 balancing
3. 블로그 상세 hero 재구성
4. 블로그 상세 rhythm blocks 추가
5. 모바일 및 fallback 정리
6. 최종 시각 검증

## Summary

이번 디자인의 핵심은 "블로그를 더 화려하게"가 아니다.  
"논문 리뷰를 더 읽고 싶게, 더 잘 읽히게" 만드는 것이다.

그래서 구현도 다음 원칙을 따른다.

- 기존 구조를 존중한다.
- `pretext`는 필요한 곳에만 쓴다.
- `B`를 중심으로 상세 페이지 체감을 먼저 바꾼다.
- `C`는 목록 가독성 보조 개선으로 포함한다.
- `SUIT`는 전체 사이트의 톤을 더 차분하고 현대적으로 맞춰준다.
