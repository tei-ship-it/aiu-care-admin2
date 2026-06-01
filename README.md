# AiU Care 어드민 — Vercel 배포 가이드

## 1분 배포 방법

### 1단계 — GitHub에 올리기
1. [github.com](https://github.com) 회원가입/로그인
2. **New repository** 클릭 → 이름: `aiu-care-admin` → Create
3. 이 폴더 전체를 드래그해서 업로드 (또는 git push)

### 2단계 — Vercel 배포
1. [vercel.com](https://vercel.com) 접속 → GitHub으로 로그인
2. **Add New Project** → `aiu-care-admin` 선택 → **Deploy**

### 3단계 — API 키 설정 (중요!)
1. Vercel 대시보드 → 프로젝트 클릭 → **Settings → Environment Variables**
2. 아래 변수 추가:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (console.anthropic.com에서 발급)
3. **Save** → **Redeploy**

### 4단계 — 완료!
Vercel이 URL을 줍니다 (예: `https://aiu-care-admin.vercel.app`)
팀원들에게 이 URL 공유하면 누구든 바로 사용 가능!

---

## 폴더 구조
```
aiu-care-admin/
├── api/
│   └── generate.js    ← Claude API 서버 함수 (API 키 안전하게 보관)
├── public/
│   └── index.html     ← 어드민 UI
├── package.json
├── vercel.json
└── README.md
```

## 기능
- 병원 기본정보, 브랜딩, 진료과, AI 현황, 톤 설정
- Claude AI 자동 카피 생성
- DALL·E 3 히어로 이미지 자동 생성 (OpenAI 키 별도 입력)
- 구글 지도 자동 embed
- 에디토리얼 상세페이지 미리보기
- PDF 저장
