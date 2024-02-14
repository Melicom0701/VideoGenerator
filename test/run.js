//const media = require('../src/services/video')
const speech = require('../src/services/speech')
const fs = require('fs');
const media = require('../src/services/media');
//const videoPaths = ['https://melicom.blob.core.windows.net/videos/video-1707456874278.webm','https://melicom.blob.core.windows.net/videos/video-1707456812717.webm'];
const videoPaths = [ './tmp/video_1.mp4', './tmp/video_2.mp4' ]

//console.log(media.mergeVideo(videoPaths)) ;
// media.getVideoDuration(videoPaths[0]).then((duration) => {
//     console.log(duration);
// }
// );
const script = {
    "Title": "Chiến Tranh Điện Biên Phủ",
    "Script": [
      {
        "text": "Trong thời kỳ chiến tranh Đông Dương, khi mọi góc phố Hà Nội đều tràn ngập bản hùng ca của lòng yêu nước, có một chiến trường lớn đang chờ đợi sự quay đầu của lịch sử - Điện Biên Phủ."
      },
      {
        "text": "Cuộc chiến tranh này nổ ra giữa Việt Minh, lực lượng dưới sự lãnh đạo của Chủ tịch Hồ Chí Minh, và quân đội Pháp, những người muốn giữ lại thuộc địa của họ."
      },
      {
        "text": "Điện Biên Phủ, một thành phố nhỏ ở tây bắc Việt Nam, trở thành trung tâm của một cuộc đối đầu đầy gian truân."
      },
      {
        "text": "Tại Điện Biên Phủ, quân Pháp đã xây dựng các đồn cứ mạnh mẽ, hy vọng sẽ ngăn chặn sự tiến công của Việt Minh. Các đồn cứ này được đặt tên theo các điểm địa danh nổi tiếng của Pháp như A1, Beatrice, Gabrielle và một số nơi khác."
      },
      {
        "text": "Vào tháng 3 năm 1954, cuộc chiến bắt đầu. Các binh sĩ Việt Minh, được dẫn đầu bởi tướng Võ Nguyên Giáp, đã chứng minh sự tài năng chiến thuật của mình."
      },
      {
        "text": "Họ sử dụng đường hầm và bảo vệ những con đường logistik của quân Pháp, tạo nên những chiến thuật tấn công đầy sáng tạo."
      },
      {
        "text": "Nếu bạn đứng trên đỉnh đồi, bạn có thể thấy những tên binh Việt Minh tự tin đánh bại quân Pháp từ các hướng khác nhau. Họ là những người lính quả cảm, chấp nhận gặp khó khăn để bảo vệ tổ quốc."
      },
      {
        "text": "Cuộc chiến diễn ra trong điều kiện khắc nghiệt với thời tiết xấu và địa hình đồi núi phức tạp. Tuy nhiên, lòng quyết tâm và sự đoàn kết của những người lính Việt Minh đã vượt qua mọi thách thức."
      },
      {
        "text": "Trong những ngày cuối cùng của tháng 4 và đầu tháng 5 năm 1954, cuộc chiến đã đến hồi kết. Những đồn cứ Pháp bắt đầu suy yếu và chấp nhận sự thật rằng họ không thể chống lại sức mạnh của những người lính Việt Nam dũng cảm."
      },
      {
        "text": "Ngày 7 tháng 5 năm 1954, quân Việt Minh chiếm lấy Điện Biên Phủ, mở ra một trang mới trong lịch sử Việt Nam và chấm dứt cuộc chiến tranh Đông Dương."
      },
      {
        "text": "Hiệp định Geneva sau đó được ký kết, chia cắt đất nước thành hai miền Bắc và Nam. Chiến thắng Điện Biên Phủ không chỉ là một chiến thắng về mặt quân sự mà còn là biểu tượng của lòng yêu nước và tinh thần đoàn kết của nhân dân Việt Nam."
      },
      {
        "text": "Những người lính Việt Minh đã chứng minh rằng sự đoàn kết và quyết tâm có thể vượt qua mọi thử thách, để bảo vệ tự do và độc lập."
      }
    ]
  }
 

async function createAudioFromScript(script) {
    const output =  script.Script.map(async (item, index) => {
    const path = `./tmp/${index}.mp3`;
    await speech.TTS(item.text,path);
      
  //  return mp3;
    }
    );
    Promise.all(output).then(() => {
        console.log('all done')

        }
        );


  //  console.log(output);


}
async function AzcreateAudioFromScript(script) {
    const output =  script.Script.map(async (item, index) => {
    const path = `./tmp/${index}.mp3`;
    await speech.AzureTTS(item.text,path);
      
  //  return mp3;
    }
    );
    Promise.all(output).then(() => {
        console.log('Oke done')

        }
        );
}


//AzcreateAudioFromScript(script);
media.Merge('./tmp/video_1.mp4','./tmp/0.mp3','./tmp/output.mp4');
