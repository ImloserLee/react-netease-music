import React, { Fragment, useState } from 'react';
import Icon from 'components/Icon';
import { Modal, Button, Input } from 'antd';
import './index.scss';

const User = () => {
    const [visible, setVisible] = useState(false);
    const handleOpenModal = () => {
        setVisible(true);
    };
    const handleLogin = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Fragment>
            <div className='user-wrapper' onClick={handleOpenModal}>
                <Icon type={'yonghu'} size={24} />
                <p>未登录</p>
            </div>
            <Modal
                visible={visible}
                title='登录'
                onCancel={handleCancel}
                footer={[
                    <Button key='login' type='primary' onClick={handleLogin} className='login-btn'>
                        登录
                    </Button>
                ]}
            >
                <div className='login-body'>
                    <Input placeholder='请输入您的网易云uid' className='login-input' />
                    <div className='login-help'>
                        <p className='help'>
                            1、请
                            <a
                                href='http://music.163.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                点我(http://music.163.com)
                            </a>
                            打开网易云音乐官网
                        </p>
                        <p className='help'>2、点击页面右上角的“登录”</p>
                        <p className='help'>3、点击您的头像，进入我的主页</p>
                        <p className='help'>
                            4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）
                        </p>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default User;
