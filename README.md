# 블로그 MSA 서버 개발 프로젝트

팀원: 상진수  
시작일: 2021년 2월 22일

## 1. 프로젝트 소개

### 프로젝트 선정 이유

- 마이크로서비스 아키텍처 연습
- Nest.js, Typescript 스킬 향상
- MongoDB Node.js Driver 사용 연습

### 프로젝트 주제

- 블로그 사용자가 로그인하고 포스트, 댓글, 대댓글을 작성하는 서비스

### 프로젝트 언어 및 환경

- 언어: Typescript
- 프레임워크: Nest.js
- 데이터베이스: MongoDB

### 주요 기능

- 작성자 로그인, 로그아웃 기능
- 작성자 탈퇴 기능
- 작성자 비밀번호 변경 기능
- 포스트 생성 / 변경 / 삭제 기능
- 댓글 생성 / 변경 / 삭제 기능
- 작성자 포스트 및 댓글 검색 기능
- 나쁜 언어 필터링 기능

---

---

## 2. 마이크로서비스 아키텍처 정의

### 1단계: 도메인 모델 생성

#### 사용자 시나리오1

- 전제(Given)

  - 작성자가 있다.
  - 작성자는 로그인 되어있다.

- 조건(When)

  - 작성자가 블로그 포스트를 작성한다.

- 결과(Then)
  - 블로그 포스트가 작성된다.

#### 사용자 시나리오2

- 전제(Given)

  - 작성자가 있다.
  - 작성자는 로그인 되어있다.

- 조건(When)

  - 작성자가 포스트에 댓글을 작성한다.

- 결과(Then)

  - 포스트에 댓글이 달린다.

#### 사용자 시나리오3

- 전제(Given)

  - 작성자가 있다.
  - 작성자는 로그인 되어있다.

- 조건(When)

  - 작성자가 댓글에 대댓글을 작성한다.

- 결과(Then)
  - 댓글에 대댓글이 달린다.

#### 사용자 시나리오4

- 전제(Given)

  - 작성자가 있다.

- 조건(When)

  - 작성자가 나쁜 언어를 사용해 포스트와 댓글을 작성한다.

- 결과(Then)
  - 나쁜 언어가 필터링 되어 \*\*\*\* 표시된다.

#### 클래스 다이어그램

<img src = "./class_diagram.jpeg" width="500" >
  
### 2단계 시스템 작업 정의
  
#### 1. 시스템 커맨드

|   액터    |       스토리        |        커맨드         |           실행            |
| :-------: | :-----------------: | :-------------------: | :-----------------------: |
|  Writer   |     포스트 생성     |     createPost()      |    포스트를 생성한다.     |
|  Writer   |      댓글 생성      |    createComment()    |     댓글를 생성한다.      |
|  Writer   |     대댓글 생성     | createNestedComment() |    대댓글을 생성한다.     |
|  Writer   |   포스트 업데이트   |     updatePost()      |  포스트를 업데이트한다.   |
|  Writer   |    댓글 업데이트    |    updateComment()    |   댓글를 업데이트한다.    |
|  Writer   |   대댓글 업데이트   | updateNestedComment() |  대댓글을 업데이트한다.   |
|  Writer   |     포스트 삭제     |     deletePost()      |    포스트를 삭제한다.     |
|  Writer   |      댓글 삭제      |    deleteComment()    |     댓글를 삭제한다.      |
|  Writer   |     대댓글 삭제     | deleteNestedComment() |    대댓글을 삭제한다.     |
|  Writer   |      회원가입       |       signup()        |     회원가입을 한다.      |
|  Writer   |       로그인        |        login()        |       로그인 한다.        |
|  Writer   |      로그아웃       |       logout()        |      로그아웃 한다.       |
|  Writer   |        탈퇴         |      withdraw()       |     회원을 탈퇴한다.      |
| Insepctor | 포스트 제목 필터링  |   filterPostTitle()   | 포스트 제목을 필터링한다. |
| Insepctor |  포스트 글 필터링   |   filterPostText()    |  포스트 글을 필터링한다.  |
| Insepctor | 댓글(대댓글) 필터링 |    filterComment()    |    댓글을 필터링한다.     |

#### 2. 쿼리

|  액터  |                스토리                |           커맨드            |                   실행                    |
| :----: | :----------------------------------: | :-------------------------: | :---------------------------------------: |
| Writer |          작성자 정보를 본다          |      searchOneWriter()      |          작성자 정보를 가져온다.          |
| Writer |          작성자 목록을 본다          |       searchWriters()       |         작성자들 정보를 가져온다.         |
| Writer |   포스트 한 개의 글과 댓글을 본다    |       searchOnePost()       |          포스트 정보를 가져온다.          |
| Writer |          모든 포스트를 본다          |      searchAllPosts()       |       모든 포스트 정보를 가져온다.        |
| Writer | 작성자 한 명이 쓴 모든 포스트를 본다 |  searchAllPostsOfWriter()   | 작성자 한 명이 쓴 모든 포스트를 가져온다. |
| Writer | 작성자 한 명이 쓴 모든 댓글들을 본다 | searchAllCommentsOfWriter() |  작성자 한 명이 쓴 모든 댓글을 가져온다.  |

### 3. 서비스 매핑

| 서비스 |                                                       작업                                                        |
| :----: | :---------------------------------------------------------------------------------------------------------------: |
| 포스트 |                      searchOnePost() searchAllPosts() createPost() deletePost() updatePost()                      |
|  댓글  | createComment() createNestedComment() updateComment() updateNestedComment() deleteComment() deleteNestedComment() |
| 작성자 |                      searchWriter() searchAllWriters() signup() login() logout() withdraw()                       |
|  쿼리  |                               searchAllPostsOfWriter() searchAllCommentsOfWriter()                                |

---

---

## 3. API 목록

HOST: http://localhost:3000

### 작성자

|        URL         | METHOD |       기능       |
| :----------------: | :----: | :--------------: |
|  v1/writer/signup  |  post  | 작성자 정보 생성 |
|  v1/writer/login   |  post  |      로그인      |
|  v1/writer/logout  | patch  |     로그아웃     |
| v1/writer/withdraw | delete | 작성자 정보 삭제 |
|    v1/writer/me    |  get   | 작성자 정보 확인 |
|   v1/writer/all    |  get   | 작성자 목록 확인 |

### 포스트

|     URL     | METHOD |         기능          |
| :---------: | :----: | :-------------------: |
|   v1/post   |  post  |      포스트 생성      |
|   v1/post   | patch  |      포스트 수정      |
|   v1/post   | delete |      포스트 삭제      |
|   v1/post   |  get   |   포스트 정보 확인    |
| v1/post/all |  get   | 모든 포스트 목록 확인 |

### 댓글

|        URL        | METHOD |      기능      |
| :---------------: | :----: | :------------: |
|    v1/comment     |  post  |   댓글 생성    |
|    v1/comment     | patch  |   댓글 수정    |
|    v1/comment     | delete |   댓글 삭제    |
|    v1/comment     |  get   | 댓글 정보 확인 |
|  v1/comment/all   |  get   | 댓글 목록 확인 |
| v1/comment/nested |  post  |  대댓글 생성   |
| v1/comment/nested | patch  |  대댓글 수정   |
| v1/comment/nested | delete |  대댓글 삭제   |

### 쿼리

|           URL            | METHOD |           기능            |
| :----------------------: | :----: | :-----------------------: |
|  v1/query/writer/posts   |  get   | 작성자의 포스트 목록 확인 |
| v1/query/writer/comments |  get   |  작성자의 댓글 목록 확인  |

---

---

## 4. 시스템 요약도

<img src = "./system_abstraction.jpeg" width="500" >
