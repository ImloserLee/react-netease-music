import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'components/Tabs';
import Icon from 'components/Icon';
import SongTable from 'components/SongTable';
import './index.scss';

const TABS = ['播放列表', '历史记录'];

function PlayList(props) {
    const { isPlayListShow, playList } = props;
    console.log(
        '%c 🍊 playList: ',
        'font-size:20px;background-color: #ED9EC7;color:#fff;',
        playList
    );
    return isPlayListShow ? (
        <div className='playlist-wrap'>
            <Tabs tabs={TABS} align='center' />
            <div className='play-header'>
                <p className='total'>{`总共首${playList.length}`}</p>
                <div className='remove'>
                    <Icon type='remove' />
                    <span className='text'>清空</span>
                </div>
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

export default connect(
    mapStateToProps,
    null
)(React.memo(PlayList));
