import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
    let { userId } = useParams();
    const listIamge = [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
            title: 'Ảnh 1',
        },
        {
            url: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
            title: 'Ảnh 2',
        },
        {
            url: 'https://cc-prod.scene7.com/is/image/CCProdAuthor/adobe-firefly-marquee-text-to-image-0-desktop-1000x1000?$pjpeg$&jpegSize=300&wid=1000',
            title: 'Ảnh 3',
        },
        {
            url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
            title: 'Ảnh 4',
        },
    ];
    const followerCount = 100;

    return (
        <div>
            <img
                style={{
                    borderRadius: '50%',
                }}
                alt="avatar"
                height={120}
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/90110224_2567536326818648_5739247854275264512_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeFQzEvlYN2ixkzLcG_IWZdvygL0wfG9NZTKAvTB8b01lE26Nt05MwEVYvip2V31i3Vdio97PFojigHUZAlG5bso&_nc_ohc=VhdAaa53bmgAX9GnKDn&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAQni4Lemk46uHXpSCkMGZFB0x_imA7StqfJRiRQmfr7Q&oe=6607C24E"
            />
            <h2>Quyet Anh Le</h2>
            <p>{followerCount} người theo dõi</p>
            <div
                style={{
                    gap: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button color="success" variant="contained">
                    Chia sẻ
                </Button>
                <Button color="info" variant="contained">
                    Chỉnh sửa hồ sơ
                </Button>
            </div>
            <div>
                <h2>Ảnh của tôi</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'revert-layer',
                        gap: '15px',
                        justifyContent: 'center',
                    }}
                >
                    {listIamge.map((item, index) => (
                        <div
                            style={{
                                backgroundColor: 'whitesmoke',
                                padding: '0 10px 20px 10px',
                                borderRadius: '30px',
                                width: '100%',
                            }}
                        >
                            <p
                                style={{
                                    textAlign: 'left',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {item.title}
                            </p>
                            <img
                                key={index}
                                alt={item.title}
                                style={{
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                                src={item.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
