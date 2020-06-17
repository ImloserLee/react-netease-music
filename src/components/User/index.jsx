import React, { Fragment, useState, useEffect, memo } from "react";
import Icon from "components/Icon";
import { Modal, Button, Input, message, Avatar } from "antd";
import { connect } from "react-redux";
import * as userActions from "store/user/action";
import { bindActionCreators } from "redux";
import { toRem, getStorage, UID_KEY, isDef } from "utils";

import "./index.scss";

const User = props => {
	const {
		user: { nickname, avatarUrl }
	} = props;
	const [visible, setVisible] = useState(false);
	const [cfmVisible, setCfmVisible] = useState(false);
	const [inputVal, setInputVal] = useState("");
	const handleOpenModal = () => {
		setVisible(true);
	};
	const handleOpenConfirm = () => {
		setCfmVisible(true);
	};
	const handleLogin = () => {
		if (!inputVal) {
			message.warning("请先填写uid");
			return;
		}
		props.userActions.login(inputVal).then(res => {
			if (res) {
				setVisible(false);
			}
		});
	};

	const handleLogout = () => {
		props.userActions.logout().then(() => {
			setCfmVisible(false);
		});
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleCfmCancel = () => {
		setCfmVisible(false);
	};
	const handleInputChange = e => {
		setInputVal(e.target.value);
	};

	// 初始化登录
	useEffect(() => {
		const uid = getStorage(UID_KEY);

		if (isDef(uid)) {
			props.userActions.login(uid);
		}
	}, [props.userActions]);
	return (
		<Fragment>
			{props.isLogin ? (
				<div className='user-wrapper' onClick={handleOpenConfirm}>
					<Avatar src={avatarUrl} />
					<p>{nickname}</p>
				</div>
			) : (
				<div className='user-wrapper' onClick={handleOpenModal}>
					<Icon type={"yonghu"} size={24} />
					<p>未登录</p>
				</div>
			)}
			<Modal
				visible={cfmVisible}
				title='提示'
				width={toRem(320)}
				onCancel={handleCfmCancel}
				footer={[
					<Button key='login' type='primary' onClick={handleLogout} className='login-btn'>
						确认
					</Button>
				]}
			>
				<p className='help'>确认要注销么?</p>
			</Modal>
			<Modal
				visible={visible}
				title='登录'
				width={toRem(320)}
				onCancel={handleCancel}
				footer={[
					<Button key='login' type='primary' onClick={handleLogin} className='login-btn'>
						登录
					</Button>
				]}
			>
				<div className='login-body'>
					<Input
						placeholder='请输入您的网易云uid'
						value={inputVal}
						onChange={handleInputChange}
						className='login-input'
					/>
					<div className='login-help'>
						<p className='help'>
							1、请
							<a href='http://music.163.com' target='_blank' rel='noopener noreferrer'>
								点我(http://music.163.com)
							</a>
							打开网易云音乐官网
						</p>
						<p className='help'>2、点击页面右上角的“登录”</p>
						<p className='help'>3、点击您的头像，进入我的主页</p>
						<p className='help'>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};
const mapStateToProps = state => {
	return {
		user: state.userReducer.userInfo,
		isLogin: state.userReducer.isLogin
	};
};

const mapDispatchToProps = dispatch => {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(User));
