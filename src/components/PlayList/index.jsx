import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicAction from 'store/music/action';
import Tabs from 'components/Tabs';
import Icon from 'components/Icon';
import SongTable from 'components/SongTable';
import './index.scss';

const TABS = ['播放列表', '历史记录'];

function PlayList(props) {
    const { isPlayListShow, playList } = props;

    const handleClear = () => {
        props.musicAction.clearPlayList();
    };

    return isPlayListShow ? (
        <div className='playlist-wrap'>
            <Tabs tabs={TABS} align='center' />
            <div className='play-header'>
                <p className='total'>{`总共首${playList.length}`}</p>
                {playList.length ? (
                    <div className='remove' onClick={handleClear}>
                        <Icon type='remove' />
                        <span className='text'>清空</span>
                    </div>
                ) : null}
            </div>
            {playList.length ? (
                <div className='playlist-table'>
                    <SongTable
                        showHeader={true}
                        songs={playList}
                        hideColumns={['index', 'img', 'albumName']}
                    />
                </div>
            ) : (
                <div className='playlist-tips'>你还没有添加任何歌曲</div>
            )}
        </div>
    ) : null;
}

const mapStateToProps = state => {
    return {
        isPlayListShow: state.musicReducer.isPlayListShow,
        playList: state.musicReducer.playList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        musicAction: bindActionCreators(musicAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(PlayList));
