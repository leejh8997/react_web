import React, { useState, useEffect, } from "react";
import { Container, TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate import(페이지 이동을 위해 필요)
import { useSearchParams } from "react-router-dom";

function FeedAdd() {
    const [userId, setUserId] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate(); // 페이지 이동을 위한 함수 리턴
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (id) {
            fetch("http://localhost:3005/feed/" + id)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUserId(data.info.userId);
                    setContent(data.info.content);
                });
        }
    }, [])
    const handleSubmit = () => {
        if (!userId || !content) return alert("모든 항목을 입력해주세요.");
        fetch('http://localhost:3005/feed/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, content }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.affectedRows > 0) {
                    console.log(images.length);
                    alert("등록 완료");
                    if (images.length > 0) UploadImg(data.result.insertId);
                    navigate("/feedList");
                    setUserId("");
                    setContent("");
                }
            })
    };
    const handleEdit = () => {
        fetch('http://localhost:3005/feed/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.affectedRows > 0) {
                    alert('수정 성공');
                    if (images.length > 0) UploadImg(data.result.insertId);
                    navigate("/feedList");
                    setUserId("");
                    setContent("");
                }
            });
    };
    const imageChange = (e) => {
        const files = e.target.files;
        setImages(files);
        console.log(images);
    };
    const UploadImg = (feedId) => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('feedId', feedId);
        const fileArray = Array.from(images); // FileList → 배열
        fileArray.forEach(file => {
            formData.append('photos', file);
        });
        fetch('http://localhost:3005/feed/upload', {
            method: "POST",
            body: formData, // FormData는 직접 Content-Type 지정하지 않음!
        })
            .then(res => res.json())
            .then(data => {
                if (data.result == "success") {
                    alert("이미지 등록 완료");
                }
            })
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>피드 등록</Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
                label="작성자 ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
                label="내용"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Box>
                <label>이미지 첨부:</label>
                <input type="file" name="photos" multiple onChange={imageChange} />
            </Box>
            <Box mt={2}>
                {id ? <Button variant="contained" color="primary" onClick={handleEdit}>
                    수정
                </Button>
                    :
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        등록
                    </Button>}
            </Box>

        </Container>
    )
}

export default FeedAdd