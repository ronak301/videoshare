import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
const Realm = require('realm')

const { width } = Dimensions.get('window')

console.disableYellowBox = true

const dummyVideo1 = {
  key: 1,
  fileShareUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/watermark/6325052111218104743.mp4',
  fileUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/mp4/6325052111218104743.mp4',
  height: 854,
  width: 480,
  thumbUrl:
    'http://img-vivashow.xiaoying.tv/20181027/4/6325052111218102760.jpg?x-oss-process=image/resize,m_lfit,w_480,limit_1/auto-orient,1'
}

const dummyVideo2 = {
  key: 2,
  fileShareUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/watermark/5369898033631783815.mp4',
  fileUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/mp4/5369898033631783815.mp4',
  height: 1280,
  width: 720,
  thumbUrl:
    'http://img-vivashow.xiaoying.tv/20181021/4/5369898033631781313.jpg?x-oss-process=image/resize,m_lfit,w_480,limit_1/auto-orient,1'
}

const dummyVideo3 = {
  key: 3,
  fileShareUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/watermark/8936894050608520534.mp4',
  fileUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/mp4/8936894050608520534.mp4',
  height: 1024,
  width: 576,
  thumbUrl:
    'http://img-vivashow.xiaoying.tv/20181111/4/8936894050608519508.jpg?x-oss-process=image/resize,m_lfit,w_480,limit_1/auto-orient,1'
}

const dummyVideo4 = {
  key: 4,
  fileShareUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/watermark/1831103172134002396.mp4',
  fileUrl:
    'http://video-vivashow.xiaoying.tv/vivashow/mp4/1831103172134002396.mp4',
  height: 480,
  width: 720,
  thumbUrl:
    'http://img-vivashow.xiaoying.tv/vivashow/thumb/1831103172134002396.jpg?x-oss-process=image/resize,m_lfit,w_480,limit_1/auto-orient,1'
}

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Video Status'
  }

  constructor() {
    super()
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    const VideoSchema = {
      name: 'video',
      properties: {
        fileShareUrl: 'string',
        fileUrl: 'string',
        height: 'int',
        width: 'string',
        thumbUrl: 'string'
      }
    }

    Realm.open({ schema: [VideoSchema] })
      .then(realm => {
        // Create Realm objects and write to local storage
        realm.write(() => {
          realm.create('video', {
            fileShareUrl:
              'http://video-vivashow.xiaoying.tv/vivashow/watermark/6325052111218104743.mp4',
            fileUrl:
              'http://video-vivashow.xiaoying.tv/vivashow/mp4/6325052111218104743.mp4',
            height: 854,
            width: 480,
            thumbUrl: ''
          })
        })

        // Query Realm for all cars with a high mileage
        const videos = realm.objects('video')
        this.setState({
          videos
        })
      })
      .catch(error => {
        console.log(error)
      })

    this.setState({
      videos: [dummyVideo1, dummyVideo2, dummyVideo3, dummyVideo4]
    })
  }

  render() {
    console.log('videos', this.state.videos)
    const { videos } = this.state
    if (!videos) {
      return <View />
    }
    return (
      <FlatList
        renderItem={this.renderItem}
        style={{ flex: 1, flexDirection: 'row' }}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
        data={videos}
      />
    )
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)',
          width: width / 2,
          height: 250,
          alignItems: 'center'
        }}
      >
        <Image
          source={{ uri: item.thumbUrl }}
          style={{ width: width / 2, height: 248 }}
        />
      </View>
    )
  }
}
