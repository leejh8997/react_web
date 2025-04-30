import React, { useState, useEffect, } from "react";
import { Container, TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate import(페이지 이동을 위해 필요)
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function UploadButton(props) {
    const imgSelect = (event) => {
      const files = event.target.files;
      props.setFile(files);
    };
  
    return (
      <div>
        <label>
          <input
            name="photos"
            multiple
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            onChange={imgSelect}
          />    
          <Button variant="contained" component="span">
            파일 선택
          </Button>
        </label>
      </div>
    );
  }

function FeedAdd() {
    const [userId, setUserId] = useState("");
    const [content, setContent] = useState("");
    const [sessionUser, setSessionUser] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 함수 리턴
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [files, setFile] = useState();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const user = jwtDecode(token); 
            setSessionUser(user);
            setUserId(user.userId);
        } else {
            alert("로그인 해라");
            navigate("/login");;
            return;
        }
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
            body: JSON.stringify({ userId : sessionUser.userId, content }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.affectedRows > 0) {
                    alert("등록 완료");
                    if (files) {
                        fnUploadFile(data.result.insertId);
                    } else {
                        navigate("/feedList");
                    }
                }
            })
    };
    const handleEdit = () => {
        if (!userId || !content) return alert("모든 항목을 입력해주세요.");

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
                    if (files) {
                        fnUploadFile(data.result.insertId);
                    } else {
                        navigate("/feedList");
                    }
                } else {
                    alert("등록에 실패했습니다.");
                }
            });
    };
    const fnUploadFile = (feedId) => {
        const formData = new FormData();
        formData.append('feedId', feedId);
        const fileArray = Array.from(files); // FileList → 배열
        fileArray.forEach(file => {
            formData.append('photos', file);
        });
        fetch('http://localhost:3005/feed/upload', {
            method: "POST",
            body: formData, // FormData는 직접 Content-Type 지정하지 않음!
        })
            .then(res => res.json())
            .then(data => {
                console.log("이미지 업로드 응답:", data);
                if (data.message == "success") {
                    navigate("/feedList");
                } else {
                    alert("이미지 저장에 실패했습니다.");
                }
            })
            .catch(err => {
                console.error(err);
            });
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
            <UploadButton setFile={setFile}></UploadButton>
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
            {/* <Box>
                <label>이미지 첨부:</label>
                <input type="file" name="photos" multiple onChange={imageChange} />
            </Box> */}
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