import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Modal from '../feedback/modal';

export default class extends Component {
  render() {
    const { selectedVideo, handleCancel } = this.props;
    const ops = { playerVars: { autoplay: 1 } };
    return (
      <Modal
        title={selectedVideo.snippet.tittle}
        visible={true}
        footer={null}
        onCancel={handleCancel}
        cancelText="Cancel"
        className="youtubeVideoModal"
        width="670"
      >
        <div className="isoCardWrapper" />
        <YouTube videoId={selectedVideo.id.videoId} opts={ops} />
      </Modal>
    );
  }
}
