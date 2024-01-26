import React from "react";

function Lion({ className }: any) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.7314 0V0.181708L14.1284 14.0275C14.0566 14.3039 14.0829 14.5707 14.2075 14.8279L16.4351 19.3845C16.4663 19.4467 16.4529 19.5238 16.4025 19.5717C15.6182 20.3209 14.9868 21.185 14.5092 22.1642C14.4804 22.2216 14.5142 22.2929 14.5765 22.3098C15.1388 22.4721 16.9658 24.8308 17.7314 25.8989V25.9627C17.7374 25.9546 17.7488 25.9395 17.755 25.9308C17.7611 25.9388 17.7726 25.9542 17.7785 25.9627V25.8989C18.5441 24.8308 20.3711 22.4721 20.9335 22.3098C20.9958 22.293 21.0295 22.2217 21.0007 22.1642C20.5231 21.185 19.8917 20.3209 19.1074 19.5717C19.057 19.5238 19.0436 19.4468 19.0748 19.3845L21.3024 14.8279C21.427 14.5707 21.4534 14.3039 21.3815 14.0275L17.7785 0.181708V0L17.755 0.0908538L17.7314 0ZM8.48301 4.9068C8.47343 4.90406 8.46297 4.90516 8.45458 4.91235C4.14166 8.12787 -0.473598 13.4232 0.0391608 19.2409C0.331481 22.593 2.5889 25.4562 5.92662 26.1846V26.1853C5.99612 26.1996 6.0657 26.1658 6.09446 26.1035C6.90274 24.3751 8.17086 23.097 9.89922 22.2696C10.0781 22.1834 10.0689 22.1307 9.87079 22.1115C-0.408347 21.1554 5.52676 9.49143 8.52185 5.03235C8.5291 5.02054 8.53154 5.00579 8.5267 4.99143L8.50451 4.92691C8.50092 4.91638 8.4926 4.90955 8.48301 4.9068ZM27.0269 4.9068C27.0173 4.90953 27.009 4.91637 27.0054 4.92691L26.9839 4.99141C26.9791 5.00577 26.9808 5.02052 26.9881 5.03233C29.9831 9.49141 35.9182 21.1554 25.6391 22.1115C25.441 22.1307 25.4318 22.1834 25.6107 22.2696C27.339 23.097 28.6072 24.3751 29.4154 26.1035C29.4442 26.1657 29.5138 26.1995 29.5833 26.1853V26.1846C32.921 25.4562 35.1784 22.593 35.4707 19.2409C35.9835 13.4232 31.3682 8.12787 27.0553 4.91235C27.0469 4.90517 27.0365 4.90405 27.0269 4.9068ZM11.0977 10.9385C11.0829 10.9361 11.0657 10.952 11.045 10.9864C8.92683 14.3912 8.87587 20.1108 14.0993 20.7362C14.1712 20.7458 14.2433 20.7072 14.2768 20.6425C14.8439 19.5707 14.9581 18.487 14.6195 17.3912C14.2648 16.2459 12.9899 15.3833 12.5347 14.6046C11.8813 13.4864 11.4142 12.2852 11.133 11.0009C11.1242 10.9618 11.1124 10.9409 11.0977 10.9385ZM24.4122 10.9385C24.3975 10.9409 24.3857 10.9618 24.3769 11.0009C24.0957 12.2852 23.6286 13.4864 22.9752 14.6046C22.52 15.3833 21.2451 16.2459 20.8904 17.3912C20.5518 18.487 20.666 19.5707 21.2331 20.6425C21.2666 20.7072 21.3387 20.7458 21.4106 20.7362C26.634 20.1108 26.5831 14.3912 24.465 10.9864C24.4442 10.952 24.427 10.9361 24.4122 10.9385ZM13.3135 21.6634C8.33689 22.1019 3.43933 30.6104 10.237 33.179V33.1797C10.3807 33.2348 10.4863 33.3616 10.5151 33.5126C10.619 34.0797 10.6211 34.6434 10.522 35.2041C10.5013 35.3191 10.5364 35.34 10.6274 35.2665C11.9069 34.2155 12.3907 32.8616 12.0776 31.2052C12.0656 31.138 12.1063 31.0711 12.1733 31.0519C14.0375 30.5248 15.4291 31.0777 17.0968 31.5665C17.2038 31.5968 17.2335 31.5629 17.1856 31.4639C16.4364 29.916 15.3109 28.7269 13.8094 27.8963C13.7471 27.8626 13.6707 27.8912 13.6443 27.9559C13.0501 29.5134 11.4134 29.7627 10.4215 28.44C8.80411 26.2788 11.5167 22.9194 13.3329 21.7189C13.4016 21.6741 13.395 21.6554 13.3135 21.6634ZM22.1964 21.6634C22.1149 21.6554 22.1083 21.6741 22.177 21.7189C23.9932 22.9193 26.7058 26.2788 25.0884 28.44C24.0965 29.7626 22.4598 29.5134 21.8656 27.9559C21.8392 27.8912 21.7628 27.8626 21.7005 27.8963C20.199 28.7269 19.0735 29.916 18.3244 31.4638C18.2764 31.5629 18.3061 31.5968 18.4131 31.5665C20.0808 31.0777 21.4724 30.5248 23.3366 31.0519C23.4037 31.0711 23.4443 31.138 23.4323 31.2052C23.1192 32.8616 23.603 34.2154 24.8825 35.2665C24.9735 35.34 25.0086 35.3191 24.9879 35.2041C24.8888 34.6434 24.8909 34.0796 24.9948 33.5126C25.0236 33.3616 25.1292 33.2348 25.2729 33.1797V33.179C32.0706 30.6104 27.173 22.1019 22.1964 21.6634Z"
        fill="#056CF2"
      />
    </svg>
  );
}

export default Lion;