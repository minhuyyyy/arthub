import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
    let { userId } = useParams();
    const followerCount = 100;

    return (
        <div>
            <div>
                <div>
                    <img
                        height={120}
                        src="https://s.pinimg.com/images/user/default_280.png"
                    />
                </div>
                <h1>Le Quyet Anh</h1>
                <p>{followerCount} người theo dõi</p>
                <div>
                    <Button color="success">Chia sẻ</Button>
                    <Button>Chỉnh sửa hồ sơ</Button>
                </div>
            </div>
        </div>
    );
}
