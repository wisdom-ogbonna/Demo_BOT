// Video
const watchVideoBtn = document.querySelector('#watch-video')
const overlay = document.querySelector('.overlay')
const videoContainer = document.querySelector('.explainer-video')
const video = document.querySelector('.explainer-video video')
const closeBtn = document.querySelector('.close-btn')

const openVideo = () => {
    overlay.classList.add('active')
    videoContainer.classList.add('active')
    document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
    overlay.classList.remove('active')
    videoContainer.classList.remove('active')
    document.body.style.overflow = ''
    video.pause()
}

if(watchVideoBtn)  watchVideoBtn.addEventListener('click', openVideo)
if(closeBtn) closeBtn.addEventListener('click', closeVideo)

// Slider
const swiperContainer = document.querySelector('.swiper')
const sliderWrapper = document.querySelector('.swiper-wrapper')
document.addEventListener('DOMContentLoaded', () => {
    if(!sliderWrapper) return;
    let slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * slides.length)
        sliderWrapper.innerHTML += `<div class="swiper-slide"><img src="https://static.tradesanta.com/img/lp/slider/slide-${slides[randomIndex]}.svg" width="208" height="280" alt="pair" /></div>`
        slides = slides.filter((_, i) => i !== randomIndex)
    }


    // Init swiper
    const swiper = new Swiper(".swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        slidesOffsetBefore: 30,
        slidesOffsetAfter: 30,
        initialSlide: 0,
        freeMode: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 33,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                freeMode: false,
            },
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 33,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                freeMode: false,
            },
            1200: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 20,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                initialSlide: 0,
                freeMode: false,
            }
        },
        on: {
            init: () => {
                swiperContainer.classList.add('fade-end')
            },

            slideChange: () => {
                if (swiper.isBeginning) {
                    swiperContainer.classList.remove('fade-start')
                } else {
                    swiperContainer.classList.add('fade-start')
                }

                if (swiper.isEnd) {
                    swiperContainer.classList.remove('fade-end')
                } else {
                    swiperContainer.classList.add('fade-end')
                }
            }
        },
    });
})

function drawChart(id, chartData) {
    const isPositive = chartData.find((elem) => elem.y > 0);
    const isNegative = chartData.find((elem) => elem.y < 0);

    Chart.defaults.plugins.legend.display = false;

    const data = {
      labels: [],
      datasets: [{
        data: chartData,
        lineTension: 0.4,
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, scales } = chart;

          let color = '#46CA93';
          if (isPositive && isNegative) {
            const yAxis = scales.y
            const zeroYPixel = yAxis.getPixelForValue(0);
            color = getGradient(ctx, zeroYPixel);
          } else if (isNegative) {
            color = '#FE8484';
          }
          return color;
        },
      },
        {
          data: chartData.map(item => ({
            ...item,
            y: 0
          })),
          borderColor: '#E1E1E1',
        }
      ]
    };
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
          time: {},
          type: 'time',
        },
        y: {
          display: false,
        }
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 0,
        }
      }
    }
    const config = {
      type: 'line',
      data: data,
      options: options,
    };

    const chart = new Chart(
        document.getElementById(id),
        config
    );

    function getGradient(ctx, zeroYPixel) {
      let gradient = null
      const gradientLength = 3;
      if (zeroYPixel) {
        gradient = ctx.createLinearGradient(
            0,
            zeroYPixel - gradientLength,
            0,
            zeroYPixel + gradientLength
        );
        gradient?.addColorStop(0, '#43b085');
        gradient?.addColorStop(1, '#FE8484');
      }

      return gradient
    }

    if (!isPositive || !isNegative) {
      chart.hide(1)
    }
  }

