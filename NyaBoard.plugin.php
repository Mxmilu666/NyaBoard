<?php
namespace Plugin;

class NyaBoard implements PluginInfoInterface {

    public function __construct() {

    }

    public function getInfo(){
        $info = [
            'Name' => 'NyaBoard',
            'Version'=> "1.0",
            'Author'=> 'mxmilu',
            'ServerSupport'=> true
        ];
        return $info;
    }

    public function main(&$server = null){
        $server->handle('/', function ($request, $response) {
            $code = 302;
            $response->redirect("/dashboard", 302);
            
            if(!isset($request->server['query_string'])){
                $url = $request->server['request_uri'];
            }
            else{
                $url = $request->server['request_uri']."?".$request->server['query_string'];
            }
            mlog(" Serve {$code} | {$request->server['remote_addr']} | {$request->server['server_protocol']} | {$url} | {$request->header['user-agent']};") ;
        });

        $server->handle('/dashboard', function ($request, $response) {
            $uri = $request->server['request_uri'];
            $path = substr($uri, strlen('/dashboard') + 1);
        
            // 确保路径安全，防止访问服务器非预期的文件
            $safePath = preg_replace('#[^/\.a-zA-Z0-9_-]#', '', $path); 
        
            // 默认主页
            if ($safePath === '' || $safePath === '/') {
                $filePath = './plugins/NyaBoard/index.html';
            } else {
                $filePath = './plugins/NyaBoard/' . $safePath;
            }
        
            // 尝试读取文件
            if (($content = @\Swoole\Coroutine\System::readFile($filePath)) === false) {
                // 文件未找到或其他错误，返回404
                $response->status(404);
                $response->end('404 Not Found');
                mlog("Serve 404 | {$request->server['remote_addr']} | {$request->server['server_protocol']} | {$uri}");
                return;
            }
        
            // 根据文件扩展名设置Content-Type
            $extension = pathinfo($filePath, PATHINFO_EXTENSION);
            switch(strtolower($extension)) {
                case 'html':
                    $contentType = 'text/html; charset=utf-8';
                    break;
                case 'css':
                    $contentType = 'text/css; charset=utf-8';
                    break;
                case 'js':
                    $contentType = 'application/javascript; charset=utf-8';
                    break;
                // 其他
                default:
                    $contentType = 'application/octet-stream';
                    break;
            }
            $response->header('Content-Type', $contentType);
        
            // 成功读取文件，发送响应
            $response->end($content);
            mlog("Serve 200 | {$request->server['remote_addr']} | {$request->server['server_protocol']} | {$uri} | {$request->header['user-agent']}");
        });

    }
}