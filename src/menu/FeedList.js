import React, { useEffect, useState } from "react";
import { Stack, Container, Typography, Card, CardContent, Divider, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    // const [images, setImages] = useState([]);
    const [myFeed, setMyFeed] = useState(false);
    const [loginFlg, setLoginFlg] = useState(false);
    const [sessionUser, setSessionUser] = useState(null);
    const navigate = useNavigate();
    const path = "http://localhost:3005/";

    const fnList = () => {
        let url = "http://localhost:3005/feed";
        if (myFeed && sessionUser) {
            url += "?userId=" + sessionUser.userId;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {

                // setImages(data.imgList);
                let map = new Map();
                data.imgList.forEach(item => {
                    if (!map.has(item.id)) {
                        map.set(item.id, []);
                    }
                    map.get(item.id).push(item);
                });
                data.list = data.list.map((item) => {
                    return { ...item, list: map.get(item.id) || [] };
                })
                console.log(data.list);
                setFeeds(data.list);
            });
    }
    const fnRemove = (id) => {
        if (!window.confirm("삭제?")) {
            return;
        } else {
            fetch('http://localhost:3005/feed/' + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result > 0) {
                        alert('서버 삭제 성공');
                        fnList();
                    }
                })
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("로그아웃 됐습니다.");
        navigate("/login");
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token);
            setSessionUser(user);
            setLoginFlg(true);
        } else {
            setSessionUser(null);
            setLoginFlg(false);
        }
    }, []);
    useEffect(() => {
        // 로그아웃 상태에서 내꺼만 보기 누른 경우
        if (myFeed && !sessionUser) {
            alert("로그인이 필요합니다.");
            setMyFeed(false); // 버튼 상태 되돌리기
            return;
        }
        fnList();
    }, [myFeed, sessionUser]);
    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">피드 목록</Typography>
                {loginFlg ? <Button variant="outlined" color="error" onClick={handleLogout}>로그아웃</Button>
                    : <Button variant="outlined" color="error" onClick={() => navigate('/login')}>로그인</Button>}
            </Box>
            <Button variant="contained" onClick={() => setMyFeed(!myFeed)}>{myFeed ? "전체보기" : "내꺼만"}</Button>
            {/* 최초에는 전체목록(버튼이름 : 내꺼만) */}
            {/* 버튼 클릭 시 내꺼만 나오고 버튼 이름은 전체보기 */}
            <Divider sx={{ mb: 2 , margin : '5px'}} />
            {feeds.map(feed => (
                <Card key={feed.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{feed.userId}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{feed.content}</Typography>
                        {/* {images
                            .filter(image => image.feedId === feed.id)
                            .map(image => (
                                <img key={image.imgNo} src={path+image.imgPath} alt="피드 이미지" style={{ width: '120px', height: '120px', margin: 10 }} />
                            ))}
                        <div></div> */}
                        {feed.list.map((item) => {
                            return <img key={item.imgNo} src={item.imgPath} style={{ width: '120px', height: '120px', margin: 10 }}></img>
                        })}
                        <Typography variant="caption" color="text.secondary">
                            {new Date(feed.cdatetime).toLocaleString()}
                        </Typography>
                        {sessionUser && sessionUser.userId == feed.userId ?
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={() => {
                                    navigate('/FeedAdd?id=' + feed.id);
                                }}>수정</Button>
                                <Button variant="outlined" onClick={() => {
                                    fnRemove(feed.id);
                                }}>삭제</Button>
                            </Stack> : null}
                    </CardContent>
                </Card>
            ))
            }
        </Container >
    )
}

export default FeedList