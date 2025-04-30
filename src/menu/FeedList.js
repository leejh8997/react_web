import React, { useEffect, useState } from "react";
import { Stack, Container, Typography, Card, CardContent, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    // const [images, setImages] = useState([]);
    const [myFeed, setMyFeed] = useState(false);
    const token = localStorage.getItem("token");
    const sessionUser = jwtDecode(token);
    const navigate = useNavigate();
    const path = "http://localhost:3005/";

    const fnList = () => {
        let url = "http://localhost:3005/feed";
        if (myFeed) {
            url += "?userId=" + sessionUser.userId;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                
                // setImages(data.imgList);
                let map = new Map();
                data.imgList.forEach(item => {
                    if(!map.has(item.id)){
                        map.set(item.id, []);
                    }
                    map.get(item.id).push(item);
                });
                data.list = data.list.map((item)=>{
                    return {...item, list : map.get(item.id) || []};
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
    useEffect(() => {
        fnList();
    }, [myFeed])
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>피드 목록</Typography>
            <Button variant="contained" onClick={() => setMyFeed(!myFeed)}>{myFeed ? "전체보기" : "내꺼만"}</Button>
            {/* 최초에는 전체목록(버튼이름 : 내꺼만) */}
            {/* 버튼 클릭 시 내꺼만 나오고 버튼 이름은 전체보기 */}
            <Divider sx={{ mb: 2 }} />
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
                        {feed.list.map((item)=>{
                            return <img key={item.imgNo} src={path+item.imgPath} style={{ width: '120px', height: '120px', margin: 10 }}></img>
                        })}
                        <Typography variant="caption" color="text.secondary">
                            {new Date(feed.cdatetime).toLocaleString()}
                        </Typography>
                        {sessionUser.userId == feed.userId ?
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